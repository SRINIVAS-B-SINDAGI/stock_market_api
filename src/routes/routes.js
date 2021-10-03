// Required External Modules and Interfaces

const express = require("express");
const { checkJwt } = require("../authz/check-jwt");
const {
  getEtfInformation,
  getStockInformation,
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
routes.get("/etfs", async (req, res, next) => {
  // handleQueryParamError(fileName, next);
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
routes.get("/stocks", async (req, res, next) => {
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

routes.get("/etf", async (req, res, next) => {
  const fileName = req.query.filename;
  handleQueryParamError(fileName, next);
  getEtfInformation(fileName)
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

routes.get("/stock", async (req, res, next) => {
  const fileName = req.query.filename;
  handleQueryParamError(fileName, next);
  getStockInformation(fileName)
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

routes.post("/standard-deviation", async (req, res, next) => {
  const fileName = req.body.filename;
  const start = req.body.start;
  const end = req.body.end;
  // handleQueryParamError(fileName, next);
  getStandardDevation(fileName, start, end)
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
