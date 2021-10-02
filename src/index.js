const express = require("express");

// App Variables
const app = express();

// Application Configuration

app.use(function (err) {
  console.log(err);
});

// Start Server

app.listen(6060, () => console.log(`API Server listening on port 6060`));
