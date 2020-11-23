'use strict';

const schema = require('./todo-schema.js');
const Collection = require('../mongo.js');

class TodoCollection extends Collection {
  constructor() {
    super(schema);
  }
}

module.exports = new TodoCollection();
