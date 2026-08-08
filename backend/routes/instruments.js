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

    // Don't return the full candle history in the list view to keep it fast
    const instruments = await Instrument.find(query).select("-candles").sort({ symbol: 1 });
    res.json(instruments);
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
