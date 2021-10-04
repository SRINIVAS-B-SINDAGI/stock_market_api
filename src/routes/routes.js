// Required External Modules and Interfaces

const express = require("express");
const { checkJwt } = require("../authz/check-jwt");
const {
  handleQueryParamError,
  getEtfsList,
  getStocksList,
  getStandardDevation,
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

// Get All ETFS
routes.get("/etfs", checkJwt, async (req, res, next) => {
  getEtfsList()
    .then((value) => {
      if (value == null) {
        res.status(400).json({
          status: "failure",
          message: "Data not found Error",
        });
      } else {
        res.send(value);
      }
    })
    .catch((err) => {
      next(err);
    });
});

// Get All STOCKS
routes.get("/stocks", checkJwt, async (req, res, next) => {
  getStocksList()
    .then((value) => {
      if (value == null) {
        res.status(400).json({
          status: "failure",
          message: "Data not found Error",
        });
      } else {
        res.send(value);
      }
    })
    .catch((err) => {
      next(err);
    });
});

routes.post("/standard-deviation", checkJwt, async (req, res, next) => {
  const fileName = req.body.filename;
  const start = req.body.start;
  const end = req.body.end;
  const type = req.body.type;

  // handleQueryParamError(fileName, next);
  getStandardDevation(fileName, start, end, type)
    .then((value) => {
      if (value == null) {
        res.status(400).json({
          status: "failure",
          message: "File not found Error",
        });
      } else {
        res.send(value);
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = routes;
