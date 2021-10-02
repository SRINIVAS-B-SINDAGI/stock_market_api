const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { clientOrigins, serverPort } = require("./config/env.dev");

const routes = require("./routes/routes");

// App Variables
const app = express();

// Application Configuration

app.use(helmet());
app.use(cors({ origin: clientOrigins }));
app.use(express.json());
app.use("/api", routes);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send(err.message);
});

// Start Server

app.listen(serverPort, () =>
  console.log(`API Server listening on port ${serverPort}`)
);
