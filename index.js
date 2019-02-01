module.exports = (api, options) => {
  
  /**
   *
   */
  api.chainWebpack(webpackConfig => {
    /**
     * modify webpack config with webpack-chain
     */
  });
  
  /**
   *
   */
  api.configureWebpack(webpackConfig => {
    /**
     * modify webpack config
     * or return object to be merged with webpack-merge
     */
  });
  
  /**
   *
   */
  api.registerCommand('sdk', {
    description: 'Download application sdk from platform',
    usage: 'vue-cli-service sdk [options]',
    options: {
      '--lang': 'specifies language of sdk',
      '--system': 'specifies system of the application on platform'
    }
  },args => {
    /**
     * register `vue-cli-service sdk`
     */
    
    /**
     * Finally use the sdk script to fetch, unzip and copy sdk
     */
    require('./sdk.js')(options, api, args);
  });
};

/**
 * define specific mode for command to run
 * @type {{sdk: string}}
 */
module.exports.defaultModes = {
  sdk: 'development'
};