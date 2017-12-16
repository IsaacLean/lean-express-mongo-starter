'use strict';

const express = require('express');
const helmet = require('helmet');
const jsonParser = require('body-parser').json;
const mongoose = require('mongoose');
const morgan = require('morgan');

const config = require('./config');
const kittenDBRoutes = require('./routes/kitten-db');
const restAPITestRoutes = require('./routes/rest-api');
const routes = require('./routes');

mongoose.Promise = global.Promise;
mongoose
  .connect(config.MONGO_URI, { useMongoClient: true })
  .then(() => console.log('db connection successful')) //eslint-disable-line
  .catch(err => console.error('connection error: %s', err)); // eslint-disable-line

const app = express();
app.set('view engine', 'pug');

if (config.ENV === 'production') {
  app.use(morgan('common'));
} else if (config.ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());
app.use(jsonParser());
app.use('/static', express.static('static'));
app.use('/static', express.static('node_modules/bootstrap/dist'));
app.use('/static', express.static('node_modules/jquery/dist'));
app.use('/static', express.static('node_modules/popper.js/dist/umd'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use(routes);
app.use('/kitten-db', kittenDBRoutes);
app.use('/rest-api', restAPITestRoutes);

// 404
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: { message: err.message } });
});

console.log(`Mode: ${config.ENV}`); // eslint-disable-line

module.exports = app;
