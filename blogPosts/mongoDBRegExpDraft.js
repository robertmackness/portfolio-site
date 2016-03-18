// Lower Case Everything (go have a coffee)

db.customers.find().forEach( 
  function(c){ 
    c.first_name = c.first_name.toLowerCase(); 
    c.last_name = c.last_name.toLowerCase(); 
    c.company = c.company.toLowerCase(); 
    db.customers.save(c); 
  } 
);

// common mistake: "I'll just use a case insensitive RegExp..."
db.customers.find({first_name: /Stephen/i, last_name: /Fowlery/i, company: /Tanoodle/i}).explain("executionStats");

// Add indexes - retarded
For queries starting with a first name:
db.customers.addIndex(first_name: 1});
db.customers.addIndex(first_name: 1, last_name: 1);
db.customers.addIndex(first_name: 1, last_name: 1, company: 1);
db.customers.addIndex(first_name: 1, company: 1, last_name: 1);

For queries starting with a last name:
db.customers.addIndex(last_name: 1});
db.customers.addIndex(last_name: 1, first_name: 1);
db.customers.addIndex(last_name: 1, first_name: 1, company: 1);
db.customers.addIndex(last_name: 1, company: 1, last_name: 1);

For queries starting with a company name:
db.customers.addIndex(company: 1});
db.customers.addIndex(company: 1, first_name: 1);
db.customers.addIndex(company: 1, first_name: 1, last_name: 1);
db.customers.addIndex(company: 1, last_name: 1, first_name: 1);

// Add indexes - smart
db.customers.addIndex(first_name: 1, last_name: 1, company: 1);
db.customers.addIndex(first_name: 1, company: 1, last_name: 1);
db.customers.addIndex(last_name: 1, first_name: 1, company: 1);
db.customers.addIndex(last_name: 1, company: 1, last_name: 1);
db.customers.addIndex(company: 1, first_name: 1, last_name: 1);
db.customers.addIndex(company: 1, last_name: 1, first_name: 1);


// http://www.json-generator.com/ 10,000 users tool
// remove comma after each object
[
  '{{repeat(10000)}}',
  {
    first_name: '{{firstName().toLowerCase()}}',
    last_name: '{{surname().toLowerCase()}}',
    company: '{{company().toLowerCase()}}',
    email: '{{email()}}',
    phone: '+1 {{phone()}}',
    address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{country()}}',
    job_title: function (tags) {
      var titles = ['CEO', 'CFO', 'CTO', 'Sales Director', 'Account Manager', 'Accountant', 'Engineer', 'Administration Officer', 'General Manager', 'Programmer', 'Executive Assistant', 'Marketting Officer'];
      return titles[tags.integer(0, titles.length - 1)];
    }
  }
]