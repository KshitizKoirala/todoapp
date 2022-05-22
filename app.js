// Third Party Dependencies
require("dotenv").config();
require("express-async-errors"); // For running async.js middleware to wrap in our routes
const helmet = require("helmet");
const express = require("express");
const Logger = require("./logger/logger");

const app = express();

// Middlewares
app.use(express.static("public"));   // Point the static folder

app.set("view engine", "ejs");   // Specify the view engine
app.disable("x-powered-by");

process.on("uncaughtException", (ex) => {
  Logger.error(ex);
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  // So that we can log the unhandled rejection as exception
  Logger.error(ex);
  process.exit(1);
});

// Adding helmet for known HTTP Vulnerabilities
// app.use(helmet()); 

// Setup for routes
require("./routes/routes")(app);

const port = process.env.PORT || 5000;
const server = app.listen(port, console.log(`Listening on port ${port}`));

// For Test
module.exports = server;