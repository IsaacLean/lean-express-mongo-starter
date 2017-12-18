'use strict';

const express = require('express');
const router = express.Router();

const ENV = require('../config').ENV;

router.get('/', (req, res) => {
  res.render('root', { headTitle: 'Lean Express/Mongo Starter' });
});

router.get('/hello-world', (req, res) => res.send('Hello World!'));

router.get('/template-test', (req, res) => {
  const locals = {
    content: `A big strong tree needs big strong roots.
      There isn't a rule.
      You just practice and find out which way works best for you.
      You can't have light without dark.
      You can't know happiness unless you've known sorrow.
      There are no limits in this world.
      Go out on a limb - that's where the fruit is.`,
    contentTitle: 'Happy Trees',
    headTitle: 'Template Test'
  };

  if (ENV === 'production') {
    locals.css = ['/static/css/bootstrap.min.css', '/static/style.css'];
    locals.scripts = ['/static/jquery.min.js', '/static/popper.min.js', '/static/js/bootstrap.min.js'];
  } else {
    locals.css = ['/static/css/bootstrap.css', '/static/style.css'];
    locals.scripts = ['/static/jquery.js', '/static/popper.js', '/static/js/bootstrap.js'];
  }

  res.render('template-test', locals);
});

module.exports = router;
