// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

// Cors
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/v1', require('./routes'));

module.exports = app;
