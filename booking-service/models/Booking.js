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

<<<<<<< HEAD
module.exports = mongoose.model("Booking", bookingSchema);
=======
module.exports = mongoose.model("Booking", bookingSchema);
>>>>>>> cdb157d (Add booking service and api gateway setup)
