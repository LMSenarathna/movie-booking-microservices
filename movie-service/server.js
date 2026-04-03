const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

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
      title: "Movie API",
      version: "1.0.0",
      description: "Movie Service API"
    },

    // ⭐ ADDED
    servers: [
      {
        url: "http://localhost:5002",
        description: "Movie Service"
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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api-docs-json", (req, res) => {
  res.json(swaggerSpec);
});

// connect DB
connectDB();

// routes
const movieRoutes = require("./routes/movieRoutes");
app.use("/movies", movieRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Movie Service Running...");
});

// server
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});