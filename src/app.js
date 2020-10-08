// app.js
require("dotenv").config();
const express = require("express");
const app = express();

// Routes
app.use("/v1", require("./routes"));

module.exports = app;
