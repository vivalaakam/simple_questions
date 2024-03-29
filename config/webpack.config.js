const path = require('path');
const webpack = require('webpack');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const assetsConfig = require('./assets.config');

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(assetsConfig);

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: [
    './client/index'
  ],
  output: {
    path: path.join(__dirname, '../static'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.PROXY_SERVER': JSON.stringify(process.env.PROXY_SERVER),
      'process.env.VAPID_PUBLIC_KEY': JSON.stringify(process.env.VAPID_PUBLIC_KEY)
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: [/node_modules/],
        use: ['babel-loader']
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        use: 'file-loader'
      }
    ]
  },
  performance: {
    hints: false
  }
};
