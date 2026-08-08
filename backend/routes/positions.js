const express = require("express");
const router = express.Router();
const Position = require("../models/Position");

router.get("/", async (req, res) => {
  try {
    const positions = await Position.find({});
    res.json(positions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch positions", error: error.message });
  }
});

module.exports = router;
