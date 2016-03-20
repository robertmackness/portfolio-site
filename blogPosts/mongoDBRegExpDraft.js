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
db.customers.find({first_name: /a/i, last_name: /b/i, company: /c/i}).explain("executionStats");
//time: 
    "executionSuccess" : true,
    "nReturned" : 941,
    "executionTimeMillis" : 59,
    "totalKeysExamined" : 0,
    "totalDocsExamined" : 40000,
    "executionStages" : {
      "stage" : "COLLSCAN",



//reason: This search is checking every single string fully. There is no indexing.

// I'll add some indexes, that'll fix it
db.customers.createIndex({first_name: 1});
db.customers.createIndex({last_name: 1});
db.customers.createIndex({company: 1});
db.customers.find({first_name: /a/i, last_name: /b/i, company: /c/i}).explain("executionStats");
//time:
    "nReturned" : 941,
    "executionTimeMillis" : 114,
    "totalKeysExamined" : 40000,
    "totalDocsExamined" : 10537,
    "executionStages" : {
      "stage" : "KEEP_MUTATIONS",


//reason: MongoDB can't use indexes with RegExp unless anchored to the start. Also, it's having to check 3 separate indexes.

// Ok I'll just index everything and use ^ anchors
For queries starting with a first name:
db.customers.createIndex({first_name: 1});
db.customers.createIndex({first_name: 1, last_name: 1);
db.customers.createIndex({first_name: 1, last_name: 1, company: 1);
db.customers.createIndex({first_name: 1, company: 1, last_name: 1);
For queries starting with a last name:
db.customers.createIndex({last_name: 1});
db.customers.createIndex({last_name: 1, first_name: 1);
db.customers.createIndex({last_name: 1, first_name: 1, company: 1);
db.customers.createIndex({last_name: 1, company: 1, last_name: 1);
For queries starting with a company name:
db.customers.createIndex({company: 1});
db.customers.createIndex({company: 1, first_name: 1);
db.customers.createIndex({company: 1, first_name: 1, last_name: 1);
db.customers.createIndex({company: 1, last_name: 1, first_name: 1);
db.customers.find({first_name: /^a/, last_name: /^b/, company: /^c/}).explain("executionStats");
//time: N/A 
//reason:This is totally unneeded and causes extra overhead for processing creates, updates and queries. This will start to hurt later down the line.

// Compound indexes w/anchors and lower-case sanitisation on client - smart
db.customers.createIndex({first_name: 1, last_name: 1, company: 1});
db.customers.createIndex({first_name: 1, company: 1, last_name: 1});
db.customers.createIndex({last_name: 1, first_name: 1, company: 1});
db.customers.createIndex({last_name: 1, company: 1, last_name: 1});
db.customers.createIndex({company: 1, first_name: 1, last_name: 1});
db.customers.createIndex({company: 1, last_name: 1, first_name: 1});
db.customers.find({first_name: /^a/, last_name: /^b/, company: /^c/}).explain("executionStats");
//time:
    "executionTimeMillis" : 5,
    "totalKeysExamined" : 132,
    "totalDocsExamined" : 19,

//reason:

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