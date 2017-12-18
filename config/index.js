'use strict';

const _ = require('lodash');

const config = require('./default');

let envConfig;
if (config.ENV) envConfig = require('./' + config.ENV);

module.exports = _.merge(config, envConfig);
