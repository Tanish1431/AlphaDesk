const mongoose = require("mongoose");

const holdingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exchange: { type: String, enum: ["NSE", "BSE"], default: "NSE" },
  qty: { type: Number, required: true },
  avg: { type: Number, required: true },
  price: { type: Number, required: true },
  sector: { type: String },
  marketCap: { type: String, enum: ["LARGE", "MID", "SMALL"] },
  purchaseDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Holding", holdingSchema);
