const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const webpack = require('webpack');

module.exports = merge(baseConfig, {
  mode: 'development',
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] }
    }),
    new webpack.DefinePlugin({
      WS_WEBSOCKET_ORG_URI: JSON.stringify('wss://echo.websocket.org/'),
      WS_MAPX_URI: JSON.stringify('ws://localhost:8081/')
    })
  ]
});
