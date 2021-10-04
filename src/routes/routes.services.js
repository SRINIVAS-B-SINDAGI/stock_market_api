var mongoUtil = require("../utils/mongoUtil");
const stockScheme = require("../utils/mongooseConnection");

const getEtfsList = async () => {
  var db = mongoUtil.getDb();
  const result = await db
    .collection("symbols_valid_meta")
    .find({ etf: "Y" })
    .toArray();
  return result;
};

const getStocksList = async () => {
  var db = mongoUtil.getDb();
  const result = await db
    .collection("symbols_valid_meta")
    .find({ etf: "N" })
    .toArray();
  return result;
};

const getEtfInformation = async (fileName) => {
  var db = mongoUtil.getDb();
  const result = await db.collection("etfs").findOne({ filename: fileName });
  return result;
};

const getStockInformation = async (fileName) => {
  var db = mongoUtil.getDb();
  const result = await db.collection("stocks").findOne({ filename: fileName });
  return result;
};

const getStandardDevation = async (fileName, start, end) => {
  const result = await stockScheme.aggregate([
    { $unwind: "$data" },
    {
      $match: {
        filename: fileName,
        "data.date": {
          $gte: new Date(start),
          $lte: new Date(end),
        },
      },
    },
    {
      $project: {
        _id: 0,
        filename: 1,
        "data.date": 1,
        "data.open": 1,
        "data.close": 1,
        "data.high": 1,
        "data.volume": 1,
      },
    },
  ]);
  return result;
};

const handleQueryParamError = (fileName, next) => {
  if (!fileName) {
    const err = new Error("filename query param missing");
    err.status = 400;
    next(err);
  }
};

module.exports = {
  getEtfInformation,
  getStockInformation,
  handleQueryParamError,
  getEtfsList,
  getStocksList,
  getStandardDevation,
};
