var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var loaders = [
  {
    test: /\.js?$/,
    loader: "babel",
    exclude: /node_modules/
  },
  {
    "test": /\.vue?$/,
    "loader": "vue"
  }
];

module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve('src', 'main.js'),
  node: { fs: 'empty' },
  output: {
    path: path.resolve('build'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.html'),
      inject: 'body',
      filename: 'index.html'
    })
  ],
  module: {
    loaders
  }
};
