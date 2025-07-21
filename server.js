const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Quote = require("./models/Quote"); 
const Contact = require("./models/Contact");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API to receive contact form submissions
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.status(201).json({ message: "Message received and saved." });
  } catch (err) {
    res.status(500).json({ error: "Error saving message." });
  }
});
app.post("/api/quote", async (req, res) => {
  try {
    const { name, email, service, message } = req.body;
    const newQuote = new Quote({ name, email, service, message });
    await newQuote.save();
    res.status(201).json({ message: "Quote received and saved." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving quote." });
  }
});
const searchRoutes = require("./routes/search");
app.use(searchRoutes);
app.get("/api/test", (req, res) => {
  res.send("🚀 API working fine!");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
