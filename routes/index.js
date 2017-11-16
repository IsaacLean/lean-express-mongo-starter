const express = require('express');
const router = express.Router();

const Kitten = require('../models/kitten');

router.get('/', (req, res) => {
  res.render('root', { headTitle: 'Lean Express/Mongo Starter' });
});

router.get('/hello_world', (req, res) => {
  res.send('Hello world!');
});

router.get('/mongo_test', (req, res) => {
  res.render('mongo_test', {
    headTitle: 'MongoDB & Mongoose Test',
    text:
      'Clicking the button below will trigger the MongoDB test which will update the database. Please check server logs and database after the test is done.'
  });
});

router.post('/mongo_test', (req, res) => {
  const silence = new Kitten({ name: 'Silence' });
  console.log(silence.name);

  const fluffy = new Kitten({ name: 'Fluffy' });
  console.log(fluffy);
  fluffy.speak();

  fluffy.save(function(err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });

  Kitten.find({ name: /^Fluff/ }, function(err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  });

  const noName = new Kitten();
  noName.speak();

  res.redirect('/mongo_test/done');
});

router.get('/mongo_test/done', (req, res, next) => {
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

router.get('/template_test', (req, res) => {
  res.render('template_test', {
    content: `A big strong tree needs big strong roots.
      There isn't a rule.
      You just practice and find out which way works best for you.
      You can't have light without dark.
      You can't know happiness unless you've known sorrow.
      There are no limits in this world.
      Go out on a limb - that's where the fruit is.`,
    contentTitle: 'Happy Trees',
    css: ['/static/css/bootstrap.css', '/static/style.css'],
    headTitle: 'Template Test',
    scripts: ['/static/jquery.js', '/static/popper.js', '/static/js/bootstrap.js']
  });
});

module.exports = router;
