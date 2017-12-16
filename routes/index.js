'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('root', { headTitle: 'Lean Express/Mongo Starter' });
});

router.get('/hello-world', (req, res) => res.send('Hello World!'));

router.get('/template-test', (req, res) => {
  res.render('template-test', {
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
