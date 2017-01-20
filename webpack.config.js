'use strict';

const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }, {
      test: /.less$/,
      loader: 'style!css!less!postcss'
    },
    { test: /\.(woff|woff2)$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
    { test: /\.ttf$/, loader: 'file-loader' },
    { test: /\.eot$/, loader: 'file-loader' },
    { test: /\.svg$/, loader: 'file-loader' }]
  },
  resolve: {
    extenstions: ['', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  postcss() {
    return [autoprefixer];
  }
};
