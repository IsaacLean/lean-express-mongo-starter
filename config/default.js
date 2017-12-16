'use strict';

const defaultConfig = {
  DB_NAME: process.env.DB_NAME || 'lean-express-mongo-starter',
  PORT: process.env.PORT || 3000,
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_HOST: process.env.MONGO_HOST || 'localhost'
};

defaultConfig.MONGO_URI =
  process.env.MONGO_URI || `mongodb://${defaultConfig.MONGO_HOST}:${defaultConfig.MONGO_PORT}/${defaultConfig.DB_NAME}`;

defaultConfig.ENV = process.env.NODE_ENV;

module.exports = defaultConfig;
