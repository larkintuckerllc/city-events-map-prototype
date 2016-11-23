// eslint-disable-next-line
const autoprefixer = require('autoprefixer');
// eslint-disable-next-line
const webpack = require('webpack');
const path = require('path');
// eslint-disable-next-line
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'index.html'),
  filename: 'index.html',
  inject: 'body',
});
module.exports = {
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
  },
  devtool: 'eval',
  entry: path.join(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
    }],
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.ico$/,
      loader: 'file-loader?name=[name].[ext]',
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      loader: 'url-loader?limit=10000',
    }, {
      test: /\.(eot|ttf|wav|mp3)$/,
      loader: 'file-loader',
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loaders: ['style', 'css?module&-autoprefixer', 'postcss'],
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: ['style', 'css?module&-autoprefixer', 'postcss', 'sass'],
    }, {
      // eslint-disable-next-line
      test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
      loader: 'imports-loader?jQuery=jquery',
    }],
  },
  postcss: () =>
    [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
      }),
    ],
  plugins: [
    HTMLWebpackPluginConfig,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  devServer: {
    inline: true,
    port: 8080,
  },
};
