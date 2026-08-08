const express = require("express");
const router = express.Router();
const Holding = require("../models/Holding");

router.get("/", async (req, res) => {
  try {
    const holdings = await Holding.find({});
    res.json(holdings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch holdings", error: error.message });
  }
});

module.exports = router;
