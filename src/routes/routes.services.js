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

module.exports = {
  getEtfInformation,
  getStockInformation,
};
