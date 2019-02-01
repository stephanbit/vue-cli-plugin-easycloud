# vue-cli-plugin-easycloud (Easy Cloud Manager)
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

### New files after installation
1. cfw.config.js - client framework configuration file (root of the project)

### Changed files after installation
1. .gitignore - add cfw.config.js file to avoid commit of credentials;-)
2. packages.json - add "sdk" : "vue-cli-service sdk" in script section

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
