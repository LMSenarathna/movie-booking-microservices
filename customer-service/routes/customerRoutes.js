const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     responses:
 *       201:
 *         description: Customer created successfully
 */
router.post("/", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const savedCustomer = await customer.save();

    res.status(201).json({
      message: "Customer created successfully",
      data: savedCustomer
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Customers retrieved successfully
 */
router.get("/", async (req, res) => {
  const customers = await Customer.find();

  res.json({
    message: "Customers retrieved successfully",
    data: customers
  });
});

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Customer retrieved successfully
 */
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json({
    message: "Customer retrieved successfully",
    data: customer
  });
});

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update customer
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Customer updated successfully
 */
router.put("/:id", async (req, res) => {
  const updatedCustomer = await Customer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({
    message: "Customer updated successfully",
    data: updatedCustomer
  });
});

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete customer
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 */
router.delete("/:id", async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);

  res.json({
    message: "Customer deleted successfully"
  });
});

module.exports = router;