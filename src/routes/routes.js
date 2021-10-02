// Required External Modules and Interfaces

const express = require("express");
const { checkJwt } = require("../authz/check-jwt");
const {
  getEtfInformation,
  getStockInformation,
} = require("../routes/routes.services");
// Router Definition

const routes = express.Router();

// Controller Definitions

// Auth0 Integration Testing endpoints
routes.get("/private-test-end", checkJwt, (req, res, next) => {
  res.send("private-test-end");
});

routes.get("/public-test-end", (req, res, next) => {
  res.send("public-test-end");
});

routes.get("/etf", async (req, res, next) => {
  const fileName = req.query.filename;
  getEtfInformation(fileName)
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      next(err);
    });
});

routes.get("/stock", async (req, res, next) => {
  const fileName = req.query.filename;
  getStockInformation(fileName)
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = routes;
