//################################
// Create Express App
//################################
// require Express (returns function to build server) then execute to create app
var express = require('express');
var app = express();

//################################
// Setup App Port and View Engine
//################################
// 8080 for testing, Heroku provides process.env.port
var port = process.env.PORT || 8080;
app.listen(port, function(){
  console.log("Portfolio App Server started and listening on port: " + port);
});
// Use EJS as the View Engine. Express expects a /views directory
app.set('view engine', 'ejs');

//################################
// Setup Mongoose to connect to 
//                  MongoLabs DB
//################################
var mongoose = require('mongoose');
var dbURI = "ds011258.mongolab.com:11258/portfolio-site";
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 
// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 
// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});
// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 
mongoose.connect("mongodb://mctesterson:mctesterson@ds011258.mongolab.com:11258/portfolio-site");

//################################
// Setup Express Routes into 
//         Single Page Angular App
//################################
// Static Files
app.use('/assets', express.static(__dirname + '/public'));
// Default Route into main Angular App
app.get('/', function(req,res){
  res.render('main.ejs')
});
// Customer route to customerRouter
var customerRouter = require(__dirname + '/routes/customer_router.js');
app.use('/customers', customerRouter);