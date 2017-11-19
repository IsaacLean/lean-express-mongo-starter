'use strict';

const express = require('express');
const router = express.Router();

const Kitten = require('../models/kitten');

router.get('/', (req, res) => {
  res.render('mongo_test', {
    headTitle: 'MongoDB & Mongoose Test',
    text:
      'Clicking the button below will trigger the MongoDB test which will update the database. Please check server logs and database after the test is done.'
  });
});

router.post('/', (req, res) => {
  const silence = new Kitten({ name: 'Silence' });
  console.log(silence.name);

  const fluffy = new Kitten({ name: 'Fluffy' });
  console.log(fluffy);
  fluffy.speak();

  Kitten.find({ name: /^Fluff/ }, function(err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  });

  const noName = new Kitten();
  noName.speak();

  fluffy.save(function(err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
    res.redirect('/mongo_test/done');
  });
});

router.get('/done', (req, res, next) => {
  Kitten.find(function(err, kittens) {
    if (err) {
      console.error(err);
      return next(err);
    } else {
      res.render('mongo_test', {
        headTitle: 'MongoDB & Mongoose Test - Done',
        kittens: kittens,
        text: 'Test is done.'
      });
    }
  });
});

module.exports = router;
