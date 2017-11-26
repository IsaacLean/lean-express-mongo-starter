'use strict';

const _ = require('lodash');

const config = {
  PORT: process.env.PORT || 3000
};

config.ENV = process.env.NODE_ENV || 'development';

const envConfig = require('./' + config.ENV);

module.exports = _.merge(config, envConfig);
