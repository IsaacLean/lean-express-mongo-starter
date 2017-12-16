'use strict';

const _ = require('lodash');

const config = {
  DB_NAME: process.env.DB_NAME || 'lean-express-mongo-starter',
  PORT: process.env.PORT || 3000,
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_HOST: process.env.MONGO_HOST || 'localhost'
};

config.MONGO_URI = process.env.MONGO_URI || `mongodb://${config.MONGO_HOST}:${config.MONGO_PORT}/${config.DB_NAME}`;

config.ENV = process.env.NODE_ENV;

let envConfig;
if (config.ENV) envConfig = require('./' + config.ENV);

module.exports = _.merge(config, envConfig);
