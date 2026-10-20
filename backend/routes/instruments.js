const express = require("express");
const router = express.Router();
const Instrument = require("../models/Instrument");

router.get("/", async (req, res) => {
  try {
    const { search, sector } = req.query;
    let query = {};

    if (search) {
      query.symbol = { $regex: search, $options: "i" };
    }
    if (sector) {
      query.sector = sector;
    }

    // Fetch instruments
    let instruments = await Instrument.find(query).select("-candles").sort({ symbol: 1 });

    // Simulate subtle real-time market micro-ticks (±0.05% to ±0.20%)
    const updated = instruments.map((inst) => {
      const obj = inst.toObject();
      const jitterFactor = (Math.random() - 0.49) * 0.003; // small natural jitter
      const newLtp = +(obj.ltp * (1 + jitterFactor)).toFixed(2);
      const dayChange = +(newLtp - obj.prevClose).toFixed(2);
      const dayChangePct = +((dayChange / obj.prevClose) * 100).toFixed(2);
      return {
        ...obj,
        ltp: newLtp,
        dayChange,
        dayChangePct,
      };
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch instruments", error: error.message });
  }
});

router.get("/:symbol", async (req, res) => {
  try {
    const instrument = await Instrument.findOne({ symbol: req.params.symbol.toUpperCase() });
    if (!instrument) {
      return res.status(404).json({ message: "Instrument not found" });
    }
    res.json(instrument);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch instrument details", error: error.message });
  }
});

module.exports = router;
