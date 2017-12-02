'use strict';

const _ = require('lodash');

const config = {
  MONGODB_CONNECTION_STR: `mongodb://localhost:27017/lean-express-mongo-starter`,
  PORT: process.env.PORT || 3000
};

config.ENV = process.env.NODE_ENV;

let envConfig;
if (config.ENV) envConfig = require('./' + config.ENV);

module.exports = _.merge(config, envConfig);
