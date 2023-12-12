import express = require("express");
const app = express();
const PORT = 3000;

// Define a simple endpoint
app.get('/data', (req, res) => {
  const data = {
    message: 'This is data from the provider microservice!',
    timestamp: new Date().toISOString(),
  };
  res.json(data);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Provider Microservice is running on port ${PORT}`);
});
