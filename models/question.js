'use strict';

const mongoose = require('mongoose');

const sortAnswers = (a, b) => {
  if (a.votes === b.votes) {
    return b.updatedAt - a.updatedAt;
  }
  return b.votes - a.votes;
};

const AnswerSchema = new mongoose.Schema({
  votes: { type: Number, default: 0 },
  text: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

AnswerSchema.method('update', function(updates, callback) {
  Object.assign(this, updates, { updatedAt: new Date() });
  this.parent().save(callback);
});

AnswerSchema.method('vote', function(vote, callback) {
  if (vote === 'up') {
    this.votes += 1;
  } else {
    this.votes -= 1;
  }
  this.parent().save(callback);
});

const QuestionSchema = new mongoose.Schema(
  {
    text: String,
    createdAt: { type: Date, default: Date.now },
    answers: [AnswerSchema]
  },
  {
    toObject: {
      transform: (doc, ret) => {
        delete ret.__v;
      }
    }
  }
);

QuestionSchema.pre('save', function(next) {
  this.answers.sort(sortAnswers);
  next();
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
