import express = require("express");
const app = express();
const PORT = 3000;
// Define required headers
const requiredHeaders = ['Accept', 'application/json'];

const products = [
  {id: 1, name: 'botox', price: 200},
  {id: 2, name: 'juvederm 1', price: 100},
  {id: 3, name: 'juvederm 2', price: 120},
];

// // Middleware to check for headers
// app.use((req, res, next) => {
//   const missingHeaders = requiredHeaders.filter(header => !req.headers[header]);

//   if (missingHeaders.length > 0) {
//     return res.status(400).json({
//       error: 'Missing required headers',
//       missingHeaders: missingHeaders
//     });
//   }

//   next(); // Proceed to the next middleware if all headers are present
// });

// get products endpoint
app.get('/products', (req, res) => {
  res.json(products);
});

// get product by id
app.get('/products/:id', (req, res)=> {
  let element;
  const target = products.find(e => {
    if (Object.values(e) == req.params.id){
      element = e
    }
  
});
})

// Start the server
app.listen(PORT, () => {
  console.log(`Provider Microservice is running on port ${PORT}`);
});
