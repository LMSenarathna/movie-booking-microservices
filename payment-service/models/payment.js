const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true },
    customerId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "LKR" },
    method: {
      type: String,
      required: true,
      enum: ["Card", "Cash", "Bank Transfer", "Online"],
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Paid", "Failed", "Refunded"],
    },
    paidAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);