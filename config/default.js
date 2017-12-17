'use strict';

const defaultConfig = {
  DB_NAME: process.env.DB_NAME || 'lean-express-mongo-starter',
  PORT: process.env.PORT || 3000,
  MONGODB_PORT: process.env.MONGODB_PORT || 27017,
  MONGODB_HOST: process.env.MONGODB_HOST || 'localhost'
};

defaultConfig.MONGODB_URI =
  process.env.MONGODB_URI ||
  `mongodb://${defaultConfig.MONGODB_HOST}:${defaultConfig.MONGODB_PORT}/${defaultConfig.DB_NAME}`;

defaultConfig.ENV = process.env.NODE_ENV;

module.exports = defaultConfig;
