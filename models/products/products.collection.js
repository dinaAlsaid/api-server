'use strict';
const schema = require('./products-schema.js');
const Collection = require('../mongo.js');

class ProCollection extends Collection {
  constructor() {
    super(schema);
  }
}

module.exports = new ProCollection();
