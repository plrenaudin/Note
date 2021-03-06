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
  node: config.node,
  entry: config.entry,
  output: config.output,
  plugins,
  module: config.module
};
