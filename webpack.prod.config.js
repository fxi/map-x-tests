const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production'
});
