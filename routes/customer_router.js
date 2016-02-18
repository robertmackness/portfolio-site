// Setup the Router
var express = require('express');
var router = express.Router();

//Setup Mongoose
var mongoose = require('mongoose');
var customer = require(__dirname + '/../custom_modules/mongoose_schema_customer.js');

// GET
router.get('', function(req, res, next) {
  // test - return first 100 users
  customer.find({}, function (err, customers) {
    if (err) throw err;
    res.json(customers);
    res.end();
  });
});

// GET 1 by ID
router.get('/:id', function(req, res, next){
  customer.find({_id: req.params.id}, function(err, customer){
    if(err) throw err;
    res.json(customer);
    res.end();
  })
});
// CREATE 1
router.post('/', function(req, res, next){
  
});
// UPDATE 1 by ID
router.put('/:id', function(req, res, next){
  
});
// DESTROY 1 by ID
router.delete('/:id', function(req, res, next){
  
});

//Export the router
module.exports = router;
