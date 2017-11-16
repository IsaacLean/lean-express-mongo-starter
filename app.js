const express = require('express');
const mongoose = require('mongoose');

const config = require('./config');
const routes = require('./routes');

mongoose.connect(config.CONNECTION_STR);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const app = express();
app.set('view engine', 'pug');
app.use('/static', express.static('static'));
app.use('/static', express.static('node_modules/bootstrap/dist'));
app.use('/static', express.static('node_modules/jquery'));
app.use('/static', express.static('node_modules/popper.js/dist/umd'));

app.use(routes);

// error handler
app.use((err, req, res, next) => {
  res.status(err.status);
  res.render('error', { err: err });
});

app.listen(config.PORT, () => console.log(`Example app listening on port ${config.PORT}!`));
