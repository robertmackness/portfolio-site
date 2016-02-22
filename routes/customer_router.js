// Setup the Router
var express = require('express');
var router = express.Router();

//Setup Mongoose
var mongoose = require('mongoose');
var customer = require(__dirname + '/../custom_modules/mongoose_schema_customer.js');

// QUERY
router.get('', function(req, res, next) {
  if(req.query.searchString){
    var searchRegex = new RegExp(req.query.searchString,'i');
    customer.find({ $or: [
                         {first_name: {$regex: searchRegex} }, 
                         {last_name: {$regex: searchRegex} }, 
                         {company: {$regex: searchRegex} } 
                         ]
                  })
    .exec(function(err, customers){
      if (err) console.log(err);
      res.json(customers);
      res.end();
    });
  }else{
    customer.find({}).limit(10).exec(function(err, customers){
      if (err) console.log(err);
      res.json(customers);
      res.end();
    });
  }

});

// GET by ID
router.get('/:id', function(req, res, next){
  customer.findOne({_id: req.params.id}). exec(function(err, customer){
    if(err) throw err;
    res.json(customer);
    res.end();
  });
});
// CREATE
router.post('/', function(req, res, next){
  
});
// UPDATE 1 by ID
router.put('/:id', function(req, res, next){
  // a full customer object is sent in JSON in the req.body.customerObject{}
  customer.update({_id: req.body.customerObject._id}, req.body.customerObject)
    .exec(function(err, customers){
      if (err) console.log(err);
    });
  res.end();
});
// DESTROY 1 by ID
router.delete('/:id', function(req, res, next){
  customer.remove({_id: req.params.id}, true)  //true here is the justOne operator in Mongo
      .exec(function(err, customers){
      if (err) console.log(err);
    });
  console.log("Deleting: " + req.params.id);
  res.end();
});

//Export the router
module.exports = router;
