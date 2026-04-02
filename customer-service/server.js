const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// Load env
dotenv.config();

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Swagger config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Customer API",
      version: "1.0.0",
      description: "Customer Service API"
    },

    // ⭐ ADDED
    servers: [
      {
        url: "http://localhost:5001",
        description: "Customer Service"
      },
      {
        url: "http://localhost:5000",
        description: "API Gateway"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsDoc(options);

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api-docs-json", (req, res) => {
  res.json(swaggerSpec);
});

// DB connect
connectDB();

// Routes
app.use("/customers", require("./routes/customerRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("Customer Service Running");
});

// Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});