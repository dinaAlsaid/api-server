'use strict';
const mongoose = require('mongoose');

const todo = mongoose.Schema({
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  assignee: { type: String, required: true },
  complete: { type: Boolean, required: true },
});

module.exports = mongoose.model('todo', todo);
