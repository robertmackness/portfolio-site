// Setup the Router
var express = require('express');
var router = express.Router();

//Setup Mongoose
var mongoose = require('mongoose');
var customer = require(__dirname + '/../custom_modules/mongoose_schema_customer.js');

/* GET users listing. */
router.get('/all', function(req, res, next) {
  // test - return first 100 users
  customer.find({}, function (err, customers) {
    if (err) throw err;
    res.end("" + customers);
  });
});


//Export the router
module.exports = router;