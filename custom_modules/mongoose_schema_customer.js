// Get mongoose library
var mongoose = require('mongoose');

// Get a Schema constructor function
var Schema = mongoose.Schema;

// Construct a new customer schema object
var customerSchema = new Schema({
  first_name: String,
  last_name: String,
  job_title: String,
  email: String,
  telephone: String,
  account_balance: Number,
  company: String,
  street: String,
  city: String,
  country: String
});

// Create a data model using the customer schema
var customer = mongoose.model('Customer', customerSchema);


// Export this data model for use in index.js
module.exports = customer;