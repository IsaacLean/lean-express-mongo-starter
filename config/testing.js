'use strict';

const MONGO_URI = require('./default').MONGO_URI;

module.exports = {
  MONGO_URI: `${MONGO_URI}_test`
};
