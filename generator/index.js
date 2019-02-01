const fs = require('fs');

module.exports = (api, options, rootOptions) => {
  
  /**
   * modify package.json fields
   */
  api.extendPackage({
    scripts: {
      sdk: 'vue-cli-service sdk'
    }
  });
  
  /**
   * copy and render all files in ./template with ejs
   */
  api.render('./template');
  
  /**
   * change gitignore file
   */
  api.onCreateComplete(() => {
    /**
     * .gitignore - not included in files on postProcessFiles
     * @type {string}
     */
    const ignorePath = '.gitignore';
    const ignoreCompletePath = api.resolve(ignorePath);
    const ignore = fs.existsSync(ignoreCompletePath) ? fs.readFileSync(ignoreCompletePath, 'utf-8') : '';
    
    var ignoreContent = '\n# ES Client Framework \n';
    ignoreContent += 'cfw.config.js\n';
    ignoreContent += 'tmp\n';
    
    fs.writeFileSync(ignoreCompletePath, ignore + ignoreContent);
    api.exitLog(`Updated ${ignorePath} : ${ignoreContent}`);
  });
};