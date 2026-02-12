const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  company: String,
  message: String,
  source: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Lead", leadSchema);
