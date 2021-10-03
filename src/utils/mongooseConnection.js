const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect("mongodb://127.0.0.1:27017/stock_market", options);

const stocksScheme = new mongoose.Schema(
  {
    filename: String,
    company_name: String,
    data: Array,
  },
  { collection: "stocks" }
);

const stockScheme = mongoose.model("stocks", stocksScheme);

module.exports = stockScheme;
