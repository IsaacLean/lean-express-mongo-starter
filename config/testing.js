'use strict';

const MONGODB_URI = require('./default').MONGODB_URI;

module.exports = {
  MONGODB_URI: `${MONGODB_URI}_test`
};
