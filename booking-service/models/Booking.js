const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
