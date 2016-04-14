// Setup the Router
var express = require('express');
var router = express.Router();

// GET /qikserve/products
router.get('/products', function(req, res, next) {
  res.json(
  { products:
     [
        {
          Product_ID: 1,
          Name: "Apples",
          Brand: "Fuji",
          Category: "Fruit",
          Cost_Price: 0.2,
          List_Price: 0.5
       },
       {
          Product_ID: 2,
          Name: "Diet Cola",
          Brand: "Soda-Sola",
          Category: "Soda",
          Cost_Price: 0.2,
          List_Price: 0.65
       },
       {
          Product_ID: 3,
          Name: "Cola",
          Brand: "Soda-Sola",
          Category: "Soda",
          Cost_Price: 0.2,
          List_Price: 0.65
       },
       {
          Product_ID: 4,
          Name: "Bread Rolls",
          Brand: "Wonder",
          Category: "Bread",
          Cost_Price: 0.5,
          List_Price: 1
       },
       {
          Product_ID: 5,
          Name: "TV Dinner",
          Brand: "Rustlers",
          Category: "Microwave Meal",
          Cost_Price: 1,
          List_Price: 1.2
       }
    ]
  }
  );
});

router.get('/discounts', function(req, res, next) {
  res.json(
      { discounts:
            [
              {
                Discount_ID: 1,
                Type: "Category",
                Target: "Soda",
                Discount_Qty: 3,
                Discount_Percent: 100,
                Discount_Set_Price: null, 
                Customer_Msg: "Buy 2 get the third free on all Soda!",
                Internal_Reason: "Stock nearing Best Before date",
                Priority_Level: 10
              },
              {
                Discount_ID: 2,
                Type: "Product",
                Target: "5",
                Discount_Qty: 2,
                Discount_Percent: null,
                Discount_Set_Price: 5, 
                Customer_Msg: "Buy 2 microwave meals for £5!",
                Internal_Reason: "Stock nearing Best Before date",
                Priority_Level: 10
              }
            ]
      }
  );
});

//Export the router
module.exports = router;