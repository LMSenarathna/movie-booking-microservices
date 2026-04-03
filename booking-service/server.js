// booking-service/server.js
<<<<<<< HEAD
/*const express = require("express");
=======
const express = require("express");
>>>>>>> cdb157d (Add booking service and api gateway setup)
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookingRoutes = require("./routes/bookingRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ─── Swagger Setup ────────────────────────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Booking Service API",
      version: "1.0.0",
      description:
        "Movie Booking Microservice — handles seat bookings for movies.",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5003}`,
        description: "Direct Service",
      },
      {
        url: "http://localhost:5000",
        description: "Via API Gateway",
      },
    ],
  },
  apis: ["./routes/*.js"], // reads JSDoc comments from route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

<<<<<<< HEAD
app.get("/api-docs-json", (req, res) => {
  res.json(swaggerSpec);
});

=======
>>>>>>> cdb157d (Add booking service and api gateway setup)
// ─── Routes ───────────────────────────────────────────────────────
app.use("/bookings", bookingRoutes);

// ─── Health Check ─────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ service: "Booking Service", status: "running" });
});

// ─── Start Server ─────────────────────────────────────────────────
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`🚀 Booking Service running on port ${PORT}`);
  console.log(`📄 Swagger Docs: http://localhost:${PORT}/api-docs`);
<<<<<<< HEAD
});*/


const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookingRoutes = require("./routes/bookingRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Booking Service API",
      version: "1.0.0",
      description: "Movie Booking Service",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5003}`,
      },
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api-docs-json", (req, res) => {
  res.json(swaggerSpec);
});

// routes
app.use("/bookings", bookingRoutes);

// test
app.get("/", (req, res) => {
  res.json({ service: "Booking Service Running" });
});

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`🚀 Booking running on port ${PORT}`);
=======
>>>>>>> cdb157d (Add booking service and api gateway setup)
});