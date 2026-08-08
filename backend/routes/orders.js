const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Holding = require("../models/Holding");
const Fund = require("../models/Fund");
const Instrument = require("../models/Instrument");

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, qty, price, mode, orderType = "MARKET" } = req.body;

    if (!name || !qty || !price || !mode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let fund = await Fund.findOne();
    if (!fund) {
       return res.status(400).json({ message: "Fund account not found. Please add funds first." });
    }

    const orderValue = qty * price;
    
    // Simple mock logic for order charges
    const brokerage = Math.min(20, orderValue * 0.0003);
    const charges = brokerage * 1.18; // plus GST

    if (mode === "BUY") {
        if (fund.availableBalance < orderValue + charges) {
             const order = await Order.create({ name, qty, price, mode, orderType, status: "REJECTED" });
             return res.status(400).json({ message: "Insufficient margin", order });
        }
        
        fund.availableBalance -= (orderValue + charges);
        fund.transactions.push({
            type: "TRADE",
            amount: -(orderValue + charges),
            description: `Bought ${qty} ${name}`
        });
        await fund.save();

        let holding = await Holding.findOne({ name });
        if (holding) {
             // Weighted average calculation
             const totalValue = (holding.avg * holding.qty) + orderValue;
             holding.qty += qty;
             holding.avg = totalValue / holding.qty;
             holding.price = price; // update to latest price
             await holding.save();
        } else {
             // Get instrument details if it exists
             const instrument = await Instrument.findOne({ symbol: name });
             
             await Holding.create({
                  name,
                  qty,
                  avg: price,
                  price,
                  exchange: instrument ? instrument.exchange : "NSE",
                  sector: instrument ? instrument.sector : "Other",
                  marketCap: instrument ? instrument.marketCap : "MID"
             });
        }
    } else if (mode === "SELL") {
        let holding = await Holding.findOne({ name });
        if (!holding || holding.qty < qty) {
             const order = await Order.create({ name, qty, price, mode, orderType, status: "REJECTED" });
             return res.status(400).json({ message: "Insufficient holdings", order });
        }

        fund.availableBalance += (orderValue - charges);
        fund.transactions.push({
            type: "TRADE",
            amount: (orderValue - charges),
            description: `Sold ${qty} ${name}`
        });
        await fund.save();

        holding.qty -= qty;
        if (holding.qty <= 0) {
            await Holding.deleteOne({ _id: holding._id });
        } else {
            holding.price = price;
            await holding.save();
        }
    }

    const order = await Order.create({ name, qty, price, mode, orderType, status: "COMPLETE" });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
});

module.exports = router;
