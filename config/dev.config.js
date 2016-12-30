const webpack = require('webpack');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const config = require('./webpack.config.js');
const assetsConfig = require('./assets.config');

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(assetsConfig);

config.devtool = 'cheap-module-eval-source-map';
config.entry.unshift(
  'react-hot-loader/patch',
  'webpack-hot-middleware/client'
);

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  webpackIsomorphicToolsPlugin.development()
);

config.module.loaders.push(
  {
    test: /\.scss$/,
    loader: [
      'style-loader',
      'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      'sass-loader'
    ]
  },
  {
    test: /\.css$/,
    loader: ['style-loader', 'css-loader']
  }
);

module.exports = config;
