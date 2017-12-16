'use strict';

const config = require('./default');

module.exports = {
  MONGO_URI: `${config.MONGO_URI}_test`
};
