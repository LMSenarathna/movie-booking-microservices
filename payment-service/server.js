const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// Swagger config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Payment API",
      version: "1.0.0",
      description: "Payment Service API",
    },

    // ⭐ ADDED
    servers: [
      {
        url: "http://localhost:5004",
        description: "Payment Service"
      },
      {
        url: "http://localhost:5000",
        description: "API Gateway"
      }
    ]
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

// swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api-docs-json", (req, res) => {
  res.json(swaggerSpec);
});

// DB connect
connectDB();

// routes
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/payments", paymentRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Payment Service Running...");
});

// server
const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`Payment Service running on port ${PORT}`);
});