var express = require('express');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(logger('dev'));

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser());


app.use(session({
  name :'customCookie',
  secret: 'prtkpwr', //  key for encryption
  resave: true,
  httpOnly : true,  // to secure app from cookie-forgery
}));

//node module to get path.
var path = require("path");

// to access directory of views
app.use(express.static(__dirname +'/app/views'));

var databasePath = "mongodb://localhost/greenMart";

//Establishing database connection
db = mongoose.connect(databasePath);

mongoose.connection.once('open', function() {
    console.log("Success! Database is now connected!");
});

// fs module is a module for file management in nodejs
var fs = require('fs');

// including all our model files using fs module
fs.readdirSync('./app/models').forEach(function(file){
	// check if the file is js or not
	if(file.indexOf('.js'))
		// if it is js then include the file from that folder into our express app using require
		require('./app/models/'+file);

});// end for each

// including all our controllers files using fs module
fs.readdirSync('./app/controllers').forEach(function(file){
	if(file.indexOf('.js')){
		// include a file as a route variable
		var route = require('./app/controllers/'+file);
		//call controller function of each file and pass your app instance to it
		route.controllerFunction(app)

	}

});//end for each


//error handling middleware

app.use(function(err,req,res,next){
	console.log("custom error handler");
	if(res.status == 404){
		res.send("Path Not Found");
	}
	else{
		res.send(err);
	}
});  

//success indication for test purpose
app.listen(3000, function () {
  console.log('Application listening on port 3000!');
});