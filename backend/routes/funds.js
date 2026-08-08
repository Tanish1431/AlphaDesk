const express = require("express");
const router = express.Router();
const Fund = require("../models/Fund");

router.get("/", async (req, res) => {
  try {
    let fund = await Fund.findOne();
    if (!fund) {
      // Create a default fund if none exists
      fund = await Fund.create({
        availableBalance: 500000, // ₹5,00,000
        openingBalance: 500000,
        transactions: [
          {
            type: "DEPOSIT",
            amount: 500000,
            description: "Initial Deposit"
          }
        ]
      });
    }
    res.json(fund);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch funds", error: error.message });
  }
});

router.post("/deposit", async (req, res) => {
  try {
    const { amount, description } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    let fund = await Fund.findOne();
    if (!fund) return res.status(404).json({ message: "Fund not found" });

    fund.availableBalance += amount;
    fund.transactions.push({
      type: "DEPOSIT",
      amount,
      description: description || "Deposit"
    });

    await fund.save();
    res.json(fund);
  } catch (error) {
    res.status(500).json({ message: "Deposit failed", error: error.message });
  }
});

router.post("/withdraw", async (req, res) => {
  try {
    const { amount, description } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    let fund = await Fund.findOne();
    if (!fund) return res.status(404).json({ message: "Fund not found" });

    if (fund.availableBalance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    fund.availableBalance -= amount;
    fund.transactions.push({
      type: "WITHDRAWAL",
      amount,
      description: description || "Withdrawal"
    });

    await fund.save();
    res.json(fund);
  } catch (error) {
    res.status(500).json({ message: "Withdrawal failed", error: error.message });
  }
});

module.exports = router;
