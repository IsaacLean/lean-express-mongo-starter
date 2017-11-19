'use strict';

const secret = require('./secret'); // DO NOT VERSION THIS FILE!!!

module.exports = {
  EXPRESS_PORT: 3000,
  MONGO_PORT: 27017,
  CONNECTION_STR: `mongodb://localhost:${this.MONGO_PORT}/lean-express-mongo-starter`
};
