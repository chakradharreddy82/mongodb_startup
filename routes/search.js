const express = require("express");
const router = express.Router();

const Quote = require("../models/Quote");
const Contact = require("../models/Contact");

// /api/search?key=chakri
router.get("/api/search", async (req, res) => {
  const { key } = req.query;

  if (!key) {
    return res.status(400).json({ error: "Missing search key." });
  }

  const regex = new RegExp(key, "i"); // case-insensitive

  try {
    const [quotes, contacts] = await Promise.all([
      Quote.find({ name: regex }),
      Contact.find({ name: regex })
    ]);

    res.json({ quotes, contacts });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed." });
  }
});

module.exports = router;
