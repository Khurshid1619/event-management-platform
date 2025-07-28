const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Event = require("../models/Event");

// Create Event
router.post("/", auth, async (req, res) => {
  const { title, description, date, location, category, image } = req.body;

  try {
    // Ensure auth middleware sets `req.user`
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newEvent = new Event({
      title,
      description,
      date: new Date(date), // Ensure date is stored correctly
      location,
      category,
      image,
      creator: req.user.id,
      attendees: [] // Initialize attendees array
    });

    await newEvent.save();
    return res.status(201).json(newEvent);
  } catch (err) {
    console.error("Error creating event:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get All Events with Attendee Count
router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .populate("creator", "email") // Populate creator's email only
      .sort({ date: 1 }); // Sort by date (ascending)

    // Add attendee count to each event
    const eventsWithAttendeeCount = events.map((event) => ({
      ...event._doc,
      attendeeCount: event.attendees.length, // Count attendees
    }));

    return res.json(eventsWithAttendeeCount);
  } catch (err) {
    console.error("Error fetching events:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get Upcoming Events
router.get("/upcoming", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure we compare only the date part

    const events = await Event.find({ date: { $gte: today } }).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
