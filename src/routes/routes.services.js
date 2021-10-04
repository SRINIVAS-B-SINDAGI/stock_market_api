const {
  stockScheme,
  etfScheme,
  symbolValidMetaScheme,
} = require("../utils/mongoose");

const getEtfsList = async () => {
  const result = await symbolValidMetaScheme.find({ etf: "Y" });
  return result;
};

const getStocksList = async () => {
  const result = await symbolValidMetaScheme.find({ etf: "N" });
  return result;
};

const getStandardDevation = async (fileName, start, end, type) => {
  if (type == "stock") {
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
  }
  if (type == "etf") {
    const result = await etfScheme.aggregate([
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
  }
};

const handleQueryParamError = (fileName, next) => {
  if (!fileName) {
    const err = new Error("filename query param missing");
    err.status = 400;
    next(err);
  }
};

module.exports = {
  handleQueryParamError,
  getEtfsList,
  getStocksList,
  getStandardDevation,
};
