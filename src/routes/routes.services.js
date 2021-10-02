var mongoUtil = require("../utils/mongoUtil");

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
};
