<<<<<<< HEAD
/*const express = require("express");
=======
const express = require("express");
>>>>>>> cdb157d (Add booking service and api gateway setup)
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
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         movieName:
 *           type: string
 *           description: Name of the movie being booked
 *           example: "Avengers Endgame"
 *         customerName:
 *           type: string
 *           description: Name of the customer making the booking
 *           example: "Kasun Perera"
 *         seats:
 *           type: integer
 *           description: Number of seats to book
 *           example: 2
 *         bookingDate:
 *           type: string
 *           format: date-time
 *           description: Date and time of the booking (auto-set)
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Server error
 */
<<<<<<< HEAD
/*router.post("/", async (req, res) => {
=======
router.post("/", async (req, res) => {
>>>>>>> cdb157d (Add booking service and api gateway setup)
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.json(savedBooking);
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
 *     responses:
 *       200:
 *         description: List of all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Server error
 */
<<<<<<< HEAD
/*router.get("/", async (req, res) => {
=======
router.get("/", async (req, res) => {
>>>>>>> cdb157d (Add booking service and api gateway setup)
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get a single booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ObjectId of the booking
 *     responses:
 *       200:
 *         description: Booking found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
<<<<<<< HEAD
/*router.get("/:id", async (req, res) => {
=======
router.get("/:id", async (req, res) => {
>>>>>>> cdb157d (Add booking service and api gateway setup)
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Cancel (delete) a booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ObjectId of the booking
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
<<<<<<< HEAD
/*router.delete("/:id", async (req, res) => {
=======
router.delete("/:id", async (req, res) => {
>>>>>>> cdb157d (Add booking service and api gateway setup)
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking cancelled successfully", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

<<<<<<< HEAD
module.exports = router;*/


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
=======
module.exports = router;
>>>>>>> cdb157d (Add booking service and api gateway setup)
