const express = require("express");
const router = express.Router();
const Payment = require("../models/payment");

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create payment
 */

// CREATE
router.post("/", async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get all payments
 */

// GET ALL
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get payment by ID
 */

// GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/payments/{id}:
 *   put:
 *     summary: Update payment status
 */

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: "Not found" });
    }

    payment.status = req.body.status;
    if (req.body.status === "Paid") {
      payment.paidAt = new Date();
    }

    const updated = await payment.save();

    res.json({
      message: "Payment updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/payments/{id}:
 *   delete:
 *     summary: Delete payment
 */

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: "Payment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;