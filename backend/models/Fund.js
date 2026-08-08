const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["DEPOSIT", "WITHDRAWAL", "TRADE", "CHARGES"], required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const fundSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional for now, assuming single user mode
  availableBalance: { type: Number, required: true, default: 0 },
  usedMargin: { type: Number, required: true, default: 0 },
  openingBalance: { type: Number, required: true, default: 0 },
  transactions: [transactionSchema]
}, { timestamps: true });

module.exports = mongoose.model("Fund", fundSchema);
