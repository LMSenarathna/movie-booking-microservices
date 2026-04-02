const express = require("express");
const router = express.Router();
const Payment = require("../models/payment");

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         bookingId:
 *           type: string
 *         customerId:
 *           type: string
 *         amount:
 *           type: number
 *         currency:
 *           type: string
 *         method:
 *           type: string
 *         status:
 *           type: string
 *         paidAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/", async (req, res) => {
  try {
    const payment = await Payment.create(req.body);

    res.status(201).json({
      message: "Payment created successfully",
      data: payment
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Payments list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payment'
 */
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();

    res.json({
      message: "Payments retrieved successfully",
      data: payments
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 */
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json({
      message: "Payment retrieved successfully",
      data: payment
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Update payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 */
router.put("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.status = req.body.status;

    if (req.body.status === "Paid") {
      payment.paidAt = new Date();
    }

    const updated = await payment.save();

    res.json({
      message: "Payment updated successfully",
      data: updated
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Delete payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Payment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json({
      message: "Payment deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;