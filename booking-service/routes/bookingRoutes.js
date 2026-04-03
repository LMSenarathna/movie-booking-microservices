const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - movieName
 *         - customerName
 *         - seats
 *       properties:
 *         movieName:
 *           type: string
 *           example: "Avengers Endgame"
 *         customerName:
 *           type: string
 *           example: "Kasun Perera"
 *         seats:
 *           type: integer
 *           example: 2
 *         bookingDate:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Booking created successfully
 */
router.post("/", async (req, res) => {
  try {
    delete req.body._id; // 🔥 prevent error

    const booking = new Booking(req.body);
    const savedBooking = await booking.save();

    res.json({
      message: "Booking created successfully",
      data: savedBooking
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 */
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.json({
      message: "Bookings retrieved successfully",
      data: bookings
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      message: "Booking retrieved successfully",
      data: booking
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      message: "Booking deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
