// Required External Modules and Interfaces

const express = require("express");
const { checkJwt } = require("../authz/check-jwt");

// Router Definition

const routes = express.Router();

// Controller Definitions

routes.get("/private-test-end", checkJwt, (req, res, next) => {
  res.send("private-test-end");
});

routes.get("/public-test-end", (req, res, next) => {
  res.send("public-test-end");
});

module.exports = routes;
