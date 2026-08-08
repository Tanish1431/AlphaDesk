const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    mode: { type: String, enum: ["BUY", "SELL"], required: true },
    status: { type: String, enum: ["COMPLETE", "REJECTED", "PENDING", "CANCELLED"], default: "COMPLETE" },
    orderType: { type: String, enum: ["MARKET", "LIMIT"], default: "MARKET" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
