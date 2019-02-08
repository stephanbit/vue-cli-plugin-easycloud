const { chalk, hasGit, info, error } = require('@vue/cli-shared-utils');
const axios = require('axios');

/**
 * Reverse domain name
 * @type {string}
 */
const CONFIG = 'de.easy.vue.escloud';

/**
 * Configuration file client framework 3.0
 * @type {string}
 */
const CONFIG_FILE = 'cfw.config.js';

/**
 * Template for apps prompt selector
 * @type {{type: string, name: string, message: string, choices: Array}}
 */
const APP_SELECTOR = {
  type: 'list',
  name: 'app',
  message: 'Choose a application',
  choices: []
};

/**
 * Platform related rest endpoints
 * @type {{base: string, customers: string, apps: string, cac: string}}
 */
const SERVICE_CONFIG = {
  base: '/yambas/rest',
  customers: '/customers',
  apps: '/apps',
  cac: '/models/CustomerApplicationCenter'
};

/***********************
 * default settings end
 ***********************/

// eslint-disable-next-line no-unused-vars
module.exports = api => {
  /**
   * @method getApplications
   * @param url
   * @returns {Promise<*>}
   */
  const getApplications = options => {
    const url = 'https://' + options.user + ':' + options.password + '@' + options.host + '/yambas/rest/customers/' + options.customer + '/apps';
    
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  
  /**
   * @method createAppsConfig
   * @param apps
   * @returns {Promise<void>}
   */
  const createAppsConfig = apps => {
    let config = [];
    
    apps.forEach(app => {
      config.push({
        name: app.applicationName,
        value: app.applicationName
      });
    });
    
    return config;
  };
  
  api.describeConfig({
    /**
     * Unique ID for the config
     */
    id: CONFIG,
    
    /**
     * Displayed name
     */
    name: 'EASY Cloud Platform',
    
    /**
     * Shown below the name
     */
    description: 'Manage EASY Cloud Platform for project development',
    
    /**
     * "More info" link
     */
    link: 'https://easy.de',
    
    /**
     * files client framework configurations
     */
    files: {
      cfw: {
        js: [CONFIG_FILE]
      }
    },
    
    /**
     * Config icon
     */
    icon: '/_plugin/vue-cli-plugin-easycloud/logo.png',
    
    /**
     * @method onRead
     * @param data
     * @param cwd
     * @returns {{tabs: {id: string, label: string, prompts: *[]}[]}}
     */
    onRead: ({data, cwd}) => {
      let configMenu = {
        tabs: [
          {
            id: 'general',
            label: 'Allgemein',
            prompts: [
              {
                type: 'input',
                name: 'host',
                message: 'Base URL',
                description: 'The base URL your application will be defined on the platform',
                value: data.cfw && data.cfw.host
              },
              {
                type: 'input',
                name: 'customer',
                message: 'Customer',
                value: data.cfw && data.cfw.customer
              },
              {
                type: 'input',
                name: 'user',
                message: 'Username/Email',
                value: data.cfw && data.cfw.user
              },
              {
                type: 'password',
                name: 'password',
                message: 'Password',
                value: data.cfw && data.cfw.password
              }
            ]
          }
        ]
      };
      const conf = data.cfw;
      
      return new Promise((resolve, reject) => {
        
        if (conf.host && conf.customer && conf.user && conf.password) {
          
          getApplications(conf)
            .then(response => {
              const apps = createAppsConfig(response);
              
              APP_SELECTOR.choices = apps;
              if (conf.app) APP_SELECTOR.default = conf.app;
              
              configMenu.tabs[0].prompts.push(APP_SELECTOR);
              
              resolve(configMenu);
            })
            .catch(error => {
              api.notify({
                title: 'Failed!',
                message: 'Request failed with status code 401',
                icon: 'error'
              });
              resolve(configMenu);
            });
        } else {
          resolve(configMenu);
        }
      });
    },
    
    /**
     * @method onWrite
     * @param prompts
     * @param answers
     * @param data
     * @param files
     * @param cwd
     * @param api
     */
    onWrite: ({prompts, answers, data, files, cwd, api}) => {
      
      if (answers.user && answers.customer && answers.password && answers.host) {
        api.setData('cfw', {
          host: answers.host,
          customer: answers.customer,
          user: answers.user,
          password: answers.password,
          app: answers.app || ''
        });
      }
    }
  });
  
  const OPEN_CFW = 'org.easy.vue.escloud.open-cfw';
  
  /**
   * add vue cli task to handle sdk download
   */
  api.describeTask({
    
    /**
     * RegExp executed on script commands to select which task will be described here
     */
    match: /vue-cli-service sdk/,
    
    /**
     *  description of the task
     */
    description: 'Load sdk from platform',
    
    /**
     * "More info" link
     */
    link: 'https://github.com/',
    
    /**
     * Task icon
     */
    icon: '/_plugin/vue-cli-plugin-easycloud/logo.png',
    
    /**
     * Optional parameters (inquirer prompts)
     */
    prompts: [
      {
        name: 'lang',
        type: 'list',
        default: 'backbone',
        choices: [
          {
            name: 'Javascript',
            value: 'javascript'
          },
          {
            name: 'Backbone',
            value: 'backbone'
          },
          {
            name: 'Typescript',
            value: 'typescript'
          }
        ],
        description: 'Specify sdk'
      },
      {
        name: 'system',
        type: 'list',
        default: 'test',
        choices: [
          {
            name: 'TEST',
            value: 'test'
          },
          {
            name: 'STAGING',
            value: 'staging'
          },
          {
            name: 'LIVE',
            value: 'live'
          }
        ],
        description: 'Specify platform system'
      }
    ],
    
    /**
     *
     * @param answers
     * @param args
     * @returns {Promise<void>}
     */
    onBeforeRun: async ({ answers, args }) => {
      
      /**
       * inject selected sdk arguments
       */
      if (answers.lang) args.push('--lang', answers.lang);
      
      /**
       * inject selected system arguments
       */
      if (answers.system) args.push('--system', answers.system)
    },
    
    /**
     *
     * @param args
     * @param child
     * @param cwd
     * @returns {Promise<void>}
     */
    onRun: async ({ args, child, cwd }) => {
      /**
       * child: node child process
       * cwd: process working directory
       */
    },
    
    /**
     *
     * @param args
     * @param child
     * @param cwd
     * @param code
     * @param signal
     * @returns {Promise<void>}
     */
    onExit: async ({ args, child, cwd, code, signal }) => {
      /**
       * code: exit code
       * signal: kill signal used if any
       */
    }
  });
  
  /**
   *
   */
  api.onViewOpen(({view}) => {
    if (view.id !== 'vue-project-configurations') {
      api.removeSuggestion(OPEN_CFW)
    }
  });
  
  /**
   *
   */
  api.onConfigRead(({config, data, onReadData, tabs, cwd}) => {
    if (config && config.id === CONFIG) {
      api.addSuggestion({
        id: OPEN_CFW,
        type: 'action',
        label: CONFIG_FILE + ' öffnen',
        handler() {
          const file = config.foundFiles.cfw.path;
          const {launch} = require('@vue/cli-shared-utils');
          launch(file);
          return {
            keep: true
          }
        }
      });
    } else {
      api.removeSuggestion(OPEN_CFW);
    }
  });
};