'use strict';

const express = require('express');
const app = express();
const cors = require('cors');

const timestamp = require('./middleware/timestamp');
const logger = require('./middleware/logger');
const notFound = require('./middleware/404');
const serverErr = require('./middleware/500');
const productsRouter = require('../routes/product-routes');
const categoriesRouter = require('../routes/categories-routes');

// --------------------global middlewares--------------------
app.use(cors());
app.use(express.json());
app.use(timestamp);
app.use(logger);

//--------------------routes--------------------
//products 
app.use('/api/v1/products', productsRouter);
//categories 
app.use('/api/v1/categories', categoriesRouter);


// --------------------error middlewares--------------------
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
