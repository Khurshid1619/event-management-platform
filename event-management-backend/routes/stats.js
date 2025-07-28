const express = require("express");
const Event = require("../models/Event"); // Event model import karo
const router = express.Router();

// Get total event count
router.get("/total-events", async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    res.json({ totalEvents });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
