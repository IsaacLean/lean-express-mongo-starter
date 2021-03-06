'use strict';

const express = require('express');
const router = express.Router();

const Question = require('../models/question');

router.param('qID', (req, res, next, id) => {
  Question.findById(id, (err, doc) => {
    if (err) return next(err);
    if (!doc) {
      const error = new Error('Not Found');
      error.status = 404;
      return next(error);
    }
    req.question = doc;
    next();
  });
});

router.param('aID', (req, res, next, id) => {
  req.answer = req.question.answers.id(id);
  if (!req.answer) {
    const err = new Error('Not Found');
    err.status = 404;
    return next(err);
  }
  next();
});

// API overview
router.get('/', (req, res) => {
  res.render('rest-api', { headTitle: 'REST API' });
});

// Create a question
router.post('/questions', (req, res, next) => {
  const question = new Question(req.body);
  question.save((err, question) => {
    if (err) return next(err);
    res.status(201);
    res.json(question.toObject());
  });
});

// Read questions collection
router.get('/questions', (req, res, next) => {
  Question.find({})
    .sort({ createdAt: -1 })
    .exec((err, questions) => {
      if (err) return next(err);
      res.json(questions);
    });
});

// Read a specific question
router.get('/questions/:qID', (req, res) => {
  res.json(req.question.toObject());
});

// Create a new answer
router.post('/questions/:qID/answers', (req, res, next) => {
  req.question.answers.push(req.body);
  req.question.save((err, question) => {
    if (err) return next(err);
    res.status(201);
    res.json(question.toObject());
  });
});

// Update a specific answer
router.put('/questions/:qID/answers/:aID', (req, res, next) => {
  req.answer.update(req.body, (err, question) => {
    if (err) return next(err);
    res.json(question.toObject());
  });
});

// Delete a specific answer
router.delete('/questions/:qID/answers/:aID', (req, res, next) => {
  req.answer.remove(err => {
    if (err) return next(err);

    req.question.save((err, question) => {
      if (err) return next(err);
      res.json(question.toObject());
    });
  });
});

// Vote on a specific answer
router.post(
  '/questions/:qID/answers/:aID/vote-:dir',
  (req, res, next) => {
    if (req.params.dir.search(/^(up|down)$/) === -1) {
      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    } else {
      req.vote = req.params.dir;
      next();
    }
  },
  (req, res, next) => {
    req.answer.vote(req.vote, (err, question) => {
      if (err) return next(err);
      res.json(question.toObject());
    });
  }
);

module.exports = router;
