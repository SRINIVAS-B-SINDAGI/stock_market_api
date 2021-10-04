const mongoose = require("mongoose");
const stocksScheme = new mongoose.Schema(
  {
    filename: String,
    company_name: String,
    data: Array,
  },
  { collection: "stocks" }
);

const etfsScheme = new mongoose.Schema(
  {
    filename: String,
    company_name: String,
    data: Array,
  },
  { collection: "etfs" }
);

const symbolsValidMetaScheme = new mongoose.Schema(
  {
    nasdaq_traded: String,
    symbol: String,
    security_name: String,
    listing_exchange: String,
    market_category: String,
    etf: String,
    round_lot_size: String,
    test_issue: String,
    financial_status: String,
    cqs_symbol: String,
    nasdaq_symbol: String,
    next_shares: String,
  },
  { collection: "symbols_valid_meta" }
);

module.exports = {
  stocksScheme,
  etfsScheme,
  symbolsValidMetaScheme,
};
