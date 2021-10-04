const mongoose = require("mongoose");
const {
  stocksScheme,
  etfsScheme,
  symbolsValidMetaScheme,
} = require("../schema/schema");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect("mongodb://127.0.0.1:27017/stock_market", options);

const stockScheme = mongoose.model("stocks", stocksScheme);
const etfScheme = mongoose.model("etfs", etfsScheme);
const symbolValidMetaScheme = mongoose.model(
  "symbols_valid_meta",
  symbolsValidMetaScheme
);

module.exports = { stockScheme, etfScheme, symbolValidMetaScheme };
