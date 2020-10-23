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

//--------------------routes--------------------
//products 
app.use('/api/v1', apiV1Router);
// //categories 
// app.use('/api/v1/categories', categoriesRouter);


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
