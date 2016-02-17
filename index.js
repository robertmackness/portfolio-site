//################################
// Create Express App
//################################
// require Express (returns function to build server) then execute to create app
var express = require('express');
var app = express();

//################################
// Setup App Port and Middleware
//################################
// 8080 for testing, Heroku provides process.env.port
var port = process.env.PORT || 8080;
app.listen(port);
// Use the express.static library to serve files from the public folder
app.use('/assets', express.static(__dirname + '/public'));
// Use EJS as the View Engine. Express expects a /views directory
app.set('view engine', 'ejs');

//################################
// Setup Default Route into 
//         Single Page Angular App
//################################
app.get('/', function(req,res){
  res.render('main.ejs')
});