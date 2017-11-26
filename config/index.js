'use strict';

const _ = require('lodash');

const config = {
  port: process.env.PORT || 3000
};

config.env = process.env.NODE_ENV || 'development';

const envConfig = require('./' + config.env);

module.exports = _.merge(config, envConfig);
