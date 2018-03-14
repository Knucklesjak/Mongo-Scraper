var express = require("express"); 
var bodyParser = require("bodyParser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Scraping tools
var axios = require("axios"); 
var cheerio = require("cheerio");

// Require all models to run
var db = require("./models");

var PORT = 3000; 

// Initial Express
var app = express();

// Configure the middleware (morgan)
// Morgan is a logger to log requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlendoced({ extended: true }));

// Express.static to serve public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb: " "", {
	useMongoClient: true
});

// Start the Server
app.listen(PORT, function() {
	console.log("App is running on port " + PORT + "!");
});