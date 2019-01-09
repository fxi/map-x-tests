const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'development',
  plugins: [                  
    new BrowserSyncPlugin({   
      host: 'localhost',      
      port: 3000,             
      server: { baseDir: ['dist'] }
    })                        
  ] 
});
