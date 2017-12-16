'use strict';

const express = require('express');
const router = express.Router();

const Kitten = require('../models/kitten');

router.get('/', (req, res) => {
  res.render('kitten-db', {
    headTitle: 'Kitten Database',
    text:
      'Clicking the button below will trigger the MongoDB/Mongoose test which will update the database. Please check server logs and database after the test is done.'
  });
});

router.post('/', (req, res) => {
  const silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // eslint-disable-line

  const fluffy = new Kitten({ name: 'Fluffy' });
  console.log(fluffy); // eslint-disable-line
  fluffy.speak();

  Kitten.find({ name: /^Fluff/ }, function(err, kittens) {
    if (err) return console.error(err); // eslint-disable-line
    console.log(kittens); // eslint-disable-line
  });

  const noName = new Kitten();
  noName.speak();

  fluffy.save(function(err, fluffy) {
    if (err) return console.error(err); // eslint-disable-line
    fluffy.speak();
    res.redirect('/kitten-db/done');
  });
});

router.get('/done', (req, res, next) => {
  Kitten.find(function(err, kittens) {
    if (err) {
      console.error(err); // eslint-disable-line
      return next(err);
    } else {
      res.render('kitten-db', {
        headTitle: 'MongoDB & Mongoose Test - Done',
        kittens: kittens,
        text: 'Test is done.'
      });
    }
  });
});

module.exports = router;
