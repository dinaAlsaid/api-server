'use strict';
function modelFinder(req, res, next) {
  let modelName = req.params.model;
  switch (modelName) {
    case 'products':
      req.model = require('../../models/products/products.collection.js');
      break;
    case 'categories':
      req.model = require('../../models/categories/categories.collection.js');
      break;
    default:
      throw new Error('invalid model name');
  }
  next();
}

module.exports = modelFinder;
