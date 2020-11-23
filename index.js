'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./lib/server');

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb+srv://dina:0000@cluster0.vxahw.mongodb.net/store?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 4000;

server.start(PORT);
