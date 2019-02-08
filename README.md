<p align="center"><img width="140" height="140" src="https://github.com/stephanbit/vue-cli-plugin-easycloud/blob/master/logo.png"</p>
<h1 align="center">vue-cli-plugin-easycloud</h1>
<h6 align="center">Easy Cloud Manager</h6>
<p align="center"></p>
<p align="center"></p>

> Start create your client with EASY Cloud Platform in seconds.

## Installation
- [Yarn](http://yarnpkg.com/) is strongly recommended instead of npm.
- [Vue CLI 3](https://cli.vuejs.org/) plugin for EASY Cloud Platform.

### Install with Vue UI
1. Navigate in your project to the plugin section.
2. Click add plugin button.
3. Search for easycloud.
4. Select vue-cli-plugin-easycloud.
5. Click Install vue-cli-plugin-easycloud button.

### Install on terminal with vue cli
- Open terminal amd take sure you are in the root of your vue project
````bash
# add plugin with vue
vue add vue-cli-plugin-easycloud
````


### New files after installation
- `cfw.config.js` - client framework configuration file (root of the project)
```js
module.exports = {
  
  /**
   * hostname of your backend system
   */
  host: '',
  
  /**
   * customer name of the account
   */
  customer: '',
  
  /**
   * user or email address of a registered user
   */
  user: '',
  
  /**
   * password of the registered user
   */
  password: '',
  
  /**
   * selected backend application
   */
  app: '',
};
```

### Changed files after installation
- `.gitignore` - add cfw.config.js` file to avoid commit of credentials;-)
- `packages.json` - add `"sdk" : "vue-cli-service sdk"` in script section

## Quick Setup Guide

### New menu item in configuration
After successfully installing the plugin, you should see a new entry (EASY Cloud Platform) in vue ui configuration section.
Please fill in all fields and save. After login the view will be refreshed and a new list selection appears. 
Now you can choose which platform application you want to use in your project.

### New menu item in tasks

Also a new entry sdk in the tasks section was added. For this task you can specify following parameters:

- sdk language you want to download (currently javascript, backbone and typescript are supported)
- platform system of the application (you can choose between test, staging and live)

After running the task you can find the sdk in src/lib directory

# FEATURES & ISSUES
To suggest a feature or report a bug: [https://github.com/stephanbit/vue-cli-plugin-easycloud/issues](https://github.com/stephanbit/vue-cli-plugin-easycloud/issues)

https://github.com/stephanbit/vue-cli-plugin-easycloud/blob/master/README.md