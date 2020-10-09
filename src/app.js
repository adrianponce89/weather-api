// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Cors
app.use(cors());

// Routes
app.use("/v1", require("./routes"));

module.exports = app;
