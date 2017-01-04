const config = require('../config/storybook.config.js');
module.exports = {
  context: config.context,
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: config.module.loaders,
  },
};
