const webpack = require('webpack');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./webpack.config');
const assetsConfig = require('./assets.config');

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(assetsConfig);

config.plugins.push(
  new ExtractTextPlugin('style.css'),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  webpackIsomorphicToolsPlugin
);

config.module.loaders.push(
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: ['css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'sass-loader']
    })
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: ['css-loader']
    })
  }
);

module.exports = config;
