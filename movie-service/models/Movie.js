const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  duration: Number,
  genre: String,
  language: String,
  theaterName: String,
  screenNumber: Number,
  showDate: String,
  showTime: String,
  ticketPrice: Number,
  totalSeats: Number,
  availableSeats: Number
});

module.exports = mongoose.model("Movie", movieSchema);