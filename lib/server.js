'use strict';

const express = require('express');
const app = express();
const cors = require('cors');

const timestamp = require('./middleware/timestamp');
const logger = require('./middleware/logger');
const notFound = require('./middleware/404');
const serverErr = require('./middleware/500');
const apiV1Router = require('../routes/api-v1.js');

// --------------------global middlewares--------------------
app.use(cors());
app.use(express.json());
app.use(timestamp);
app.use(logger);


//routes
//--------------------products ---------------------
app.post('/api/v1/products', postProduct);
app.get('/api/v1/products', getProducts);
app.get('/api/v1/products/:id', getProductById);
app.put('/api/v1/products/:id', updateProduct);
app.patch('/api/v1/products/:id', patchProduct);
app.delete('/api/v1/products/:id', deleteProduct);

//--------------------categories ---------------------
app.post('/api/v1/categories', postCategories);
app.get('/api/v1/categories', getCategories);
app.get('/api/v1/categories/:id', getCategoryById);
app.put('/api/v1/categories/:id', updateCategory);
app.patch('/api/v1/categories/:id', patchCategory);
app.delete('/api/v1/categories/:id', deleteCategory);

//callback functions
//--------------------products ---------------------
let productsDB = [
  {
    category: 'board games',
    name: 'monopoly',
    display_name: 'board game',
    description: 'board game',
    id: 1,
  },
  {
    category: 'ggg',
    name: 'monopoly',
    display_name: 'board game',
    description: 'board game',
    id: 2,
  },
  {
    category: 'board games',
    name: 'monopoly',
    display_name: 'board game',
    description: 'board game',
    id: 3,
  },
];

function postProduct(req, res) {
  let { category, name, display_name, description } = req.body;
  let record = { category, name, display_name, description };

  record.id = productsDB.length + 1;
  productsDB.push(record);

  res.status(200).json('added to in-memory "database"');
}
function getProducts(req, res) {
  if (req.query.category) {
    console.log('query ', req.query);
    let filtered = productsDB.filter((item) => {
      return item.category === req.query.category;
    });
    res.json(filtered);
  } else {
    res.json(productsDB);
  }
}
function getProductById(req, res) {
  let id = req.params.id;

  res.status(200).json(productsDB[id - 1]);
}
function updateProduct(req, res) {
  let { category, name, display_name, description } = req.body;
  let id = req.params.id;

  productsDB[id - 1] = { category, name, display_name, description, id };

  res.status(200).json(productsDB[id - 1]);
}

function patchProduct(req, res) {
  let id = req.params.id;

  Object.keys(req.body).forEach((key) => {
    productsDB[id - 1][key] = req.body[key]? req.body[key]: productsDB[id - 1][key];
  });
  res.status(200).json(productsDB[id - 1]);
}
function deleteProduct(req, res) {
  let id = req.params.id;
  //to update the ids because we post depending on the array length
  productsDB.splice(id - 1, 1);
  productsDB.forEach((item, index) => {
    item.id = index + 1;
  });
  res.status(200).json('number of records after delete', productsDB.length);
}

//--------------------categories ---------------------
let categoriesDB = [];

function postCategories(req, res) {
  let { name, display_name, description } = req.body;
  let record = { name, display_name, description };

  record.id = categoriesDB.length + 1;
  categoriesDB.push(record);

  res.status(200).json('added to in-memory "database"');
}
function getCategories(req, res) {
  res.json(categoriesDB);
}
function getCategoryById(req, res) {
  let id = req.params.id;

  res.status(200).json(categoriesDB[id - 1]);
}
function updateCategory(req, res) {
  let { name, display_name, description } = req.body;
  let id = req.params.id;

  categoriesDB[id - 1] = { name, display_name, description, id };

  res.status(200).json(categoriesDB[id - 1]);
}
function patchCategory(req, res) {
  let id = req.params.id;

  Object.keys(req.body).forEach((key) => {
    categoriesDB[id - 1][key] = req.body[key]? req.body[key]: categoriesDB[id - 1][key];
  });
  res.status(200).json(categoriesDB[id - 1]);
}

function deleteCategory(req, res) {
  let id = req.params.id;
  //to update the ids because we post depending on the array length
  categoriesDB.splice(id - 1, 1);
  categoriesDB.forEach((item, index) => {
    item.id = index + 1;
  });
  res.status(200).json('number of records after delete', categoriesDB.length);
}

// error middlewares

app.get('/bad', serverErr);
app.use('*', notFound);
app.use(serverErr);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  },
};
