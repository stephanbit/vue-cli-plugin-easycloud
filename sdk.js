const axios = require('axios');
const path = require('path');
const fs = require('fs');
const unzip = require('unzip2');
const ncp = require('ncp').ncp;
const { hasYarn, IpcMessenger, info, error, log, done, exit, chalk, loadModule } = require('@vue/cli-shared-utils');
const ABS_BASE_PATH = process.env.VUE_CLI_CONTEXT ? process.env.VUE_CLI_CONTEXT : process.cwd();

/**
 * @method sdk
 * @param config {Object} client framework configuration
 * @param language {String} platform sdk language
 * @param system {String} platform application system
 * @returns {Promise<void>}
 */
async function sdk(config, language, system) {
  await checkFolders();
  await download(config, language, system);
  await extract();
}

async function checkFolders() {
  const FOLDER_TEMP = './tmp/';
  const FOLDER_TARGET = './src/lib/';
  const folders = [FOLDER_TEMP, FOLDER_TARGET];
  
  info('... check folders');
  
  try {
    await folders.forEach((folder) => {
      if (!fs.existsSync(folder)) fs.mkdirSync(folder)
    });
    done('folders ready!')
  } catch (error) {
    error('creating folders failed! ' + error);
  }
  
}

/**
 * @method download
 * @param config {Object} client framework configuration
 * @param language {String} platform sdk language
 * @param system {String} platform application system
 * @returns {Promise<void>}
 */
async function download(config, language, system) {
  const url = 'https://' + config.user + ':' + config.password + '@' + config.host + '/yambas/rest/customers/' +
    config.customer + '/apps/' + config.app + '/sdk/' + language + '?usedSystem=' + system.toUpperCase();
  
  const target = path.join(ABS_BASE_PATH + '/tmp/', 'apiomat.zip');
  
  info('... try to download sdk from ' + config.host + ' for app ' + config.app);
  
  try {
    let zipFile = await axios.get(url, {responseType: 'arraybuffer'});
    info('... try to save file in ' + target);
    await fs.writeFile(target, zipFile.data, (e) => {
      if(e) throw e;
    });
    done('download finished!');
  } catch (e) {
    error('sdk download failed! ' + e);
  }
}

/**
 *
 * @returns {Promise<void>}
 */
async function extract() {
  info('... try to extract files');
  const source = path.join(ABS_BASE_PATH, '/tmp/apiomat.zip');
  const target = path.join(ABS_BASE_PATH, '/src/lib/');
  
  try {
    await fs.createReadStream(source).pipe(unzip.Extract({ path: target }));
    done('extraction finished!');
  } catch (e) {
    error('file extraction failed! ' + e);
  }
}

/**
 * Copy from temp directory to source directory
 * @method copy
 * @returns {Promise<void>}
 */
async function copy() {
  info('... try to copy files');
  
  const source = path.join(ABS_BASE_PATH, '/tmp/com/');
  const target = path.join(ABS_BASE_PATH, '/src/lib/');
  
  try {
    await ncp(source, target, (e) => {
      if (e) throw e;
      done('copy finished!');
    });
  } catch (e) {
    error('copy failed! ' + e);
  }
}

/**
 *
 * @returns {Promise<void>}
 */
async function prepareES5() {
}

/**
 *
 */
async function prepareES6() {
}

/**
 *
 * @param options
 * @param api
 * @returns {Promise<void>}
 */
module.exports = (options, api, args) => {
  let fPath = path.join(ABS_BASE_PATH, 'cfw.config.js');
  if (!fs.existsSync(fPath)) {
    error('easycloud `cfw.config.js` not found');
    return;
  }
  
  try {
    cfw = require(fPath);
  } catch (e) {
    error('reading config failed!');
    return;
  }
  
  try {
    check = cfw.host && cfw.customer && cfw.user && cfw.password && cfw.app;
    if (!check) throw 'one or more configs are missing, please check cfw.config.js';
  } catch (e) {
    error(e);
    return;
  }
  
  /**
   * specify arguments for sdk command
   */
  let language = args.lang || 'backbone';
  let system = args.system || 'test';
  
  /**
   * Finally fetch, unzip and copy sdk
   */
  sdk(cfw, language, system);
};