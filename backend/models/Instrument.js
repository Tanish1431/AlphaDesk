const mongoose = require("mongoose");

const instrumentSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  exchange: { type: String, enum: ["NSE", "BSE"], required: true, default: "NSE" },
  ltp: { type: Number, required: true },
  prevClose: { type: Number, required: true },
  dayChange: { type: Number, required: true },
  dayChangePct: { type: Number, required: true },
  sector: { type: String },
  marketCap: { type: String, enum: ["LARGE", "MID", "SMALL"] },
  open: { type: Number },
  high: { type: Number },
  low: { type: Number },
  volume: { type: Number },
  upcomingEarningsDate: { type: Date },
  lastDividendDate: { type: Date },
  candles: [{
    date: { type: Date },
    open: { type: Number },
    high: { type: Number },
    low: { type: Number },
    close: { type: Number },
    volume: { type: Number }
  }]
}, { timestamps: true });

module.exports = mongoose.model("Instrument", instrumentSchema);
