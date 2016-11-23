const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'index.html'),
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
  entry: path.join(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.(woff2?|svg)$/,
      loader: 'url-loader?limit=10000',
    }, {
      test: /\.(ttf|eot)$/,
      loader: 'file-loader',
    }, {
      test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
      loader: 'imports-loader?jQuery=jquery',
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loaders: ['style', 'css' ],
    }],
  },
  plugins: [
    HTMLWebpackPluginConfig
  ],
};
