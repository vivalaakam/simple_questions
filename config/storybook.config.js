const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const assetsConfig = require('./assets.config');

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(assetsConfig);

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        exclude: [/node_modules/],
        loaders: ['babel-loader']
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'file-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass'
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader'
      }
    ]
  }
};
