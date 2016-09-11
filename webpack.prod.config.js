var config = require('./webpack.config.js');
var webpack = require('webpack');

var plugins = config.plugins;

plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
);

module.exports = {
  entry: config.entry,
  output: config.output,
  plugins: plugins,
  module: config.module
};
