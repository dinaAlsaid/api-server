'use strict';
const schema = require('./categories-schema.js');
const Collection = require('../mongo.js');

class CategCollection extends Collection{
  constructor(){
    super(schema);
  }
  
}

module.exports= new CategCollection();