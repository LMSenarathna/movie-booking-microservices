const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const swaggerUi = require("swagger-ui-express");
<<<<<<< HEAD
const axios = require("axios");

const app = express();

// ─── Service URLs ─────────────────────────
const SERVICES = {
  movies:    "http://localhost:5002",
  customers: "http://localhost:5001",
=======

const app = express();

// ─── Service URLs (each microservice runs on its own port) ────────
const SERVICES = {
  movies:    "http://localhost:5001",
  customers: "http://localhost:5002",
>>>>>>> cdb157d (Add booking service and api gateway setup)
  bookings:  "http://localhost:5003",
  payments:  "http://localhost:5004",
};

<<<<<<< HEAD
// ─── Proxy Routes ─────────────────────────

// 🎬 Movie Service
app.use(
  "/movies",
  createProxyMiddleware({
    target: SERVICES.movies,
    changeOrigin: true,
  })
);

// 👤 Customer Service
app.use(
  "/customers",
  createProxyMiddleware({
    target: SERVICES.customers,
    changeOrigin: true,
  })
);

// 📘 Booking Service
app.use(
  "/bookings",
  createProxyMiddleware({
    target: SERVICES.bookings,
    changeOrigin: true,
  })
);

// 💳 Payment Service
app.use(
  "/payments",
  createProxyMiddleware({
    target: SERVICES.payments,
    changeOrigin: true,
  })
);

// ─── Individual Swagger Proxies (unchanged) ─────────────

app.use(
  "/movie-service",
  createProxyMiddleware({
    target: SERVICES.movies,
    changeOrigin: true,
    pathRewrite: { "^/movie-service": "" },
  })
);

app.use(
  "/customer-service",
  createProxyMiddleware({
    target: SERVICES.customers,
    changeOrigin: true,
    pathRewrite: { "^/customer-service": "" },
  })
);

app.use(
  "/booking-service",
  createProxyMiddleware({
    target: SERVICES.bookings,
    changeOrigin: true,
    pathRewrite: { "^/booking-service": "" },
  })
);

app.use(
  "/payment-service",
  createProxyMiddleware({
    target: SERVICES.payments,
    changeOrigin: true,
    pathRewrite: { "^/payment-service": "" },
  })
);

// ─── 🔥 SWAGGER MERGE LOGIC ─────────────────────────

const getSwaggerDocs = async () => {
  try {
    const [movie, customer, booking, payment] = await Promise.all([
      axios.get("http://localhost:5002/api-docs-json"),
      axios.get("http://localhost:5001/api-docs-json"),
      axios.get("http://localhost:5003/api-docs-json"),
      axios.get("http://localhost:5004/api-docs-json"),
    ]);

    return {
      openapi: "3.0.0",
      info: {
        title: "API Gateway - Movie Ticket Booking System",
        version: "1.0.0",
      },
      paths: {
        ...movie.data.paths,
        ...customer.data.paths,
        ...booking.data.paths,
        ...payment.data.paths,
      },
    };
  } catch (err) {
    console.error("Swagger merge error:", err.message);
    return {};
  }
};

// ─── 🔥 SINGLE SWAGGER UI ─────────────────────────

app.use("/api-docs", swaggerUi.serve);

app.get("/api-docs", async (req, res, next) => {
  const docs = await getSwaggerDocs();
  swaggerUi.setup(docs)(req, res, next);
});

// ─── Gateway Info ─────────────────────────

=======
// ─── Proxy Routes ─────────────────────────────────────────────────
// All requests to /movies/** → forwarded to Movie Service (port 5001)
app.use("/movies", createProxyMiddleware({
  target: SERVICES.movies,
  changeOrigin: true,
}));

// All requests to /customers/** → forwarded to Customer Service (port 5002)
app.use("/customers", createProxyMiddleware({
  target: SERVICES.customers,
  changeOrigin: true,
}));

// All requests to /bookings/** → forwarded to Booking Service (port 5003)
app.use("/bookings", createProxyMiddleware({
  target: SERVICES.bookings,
  changeOrigin: true,
}));

// All requests to /payments/** → forwarded to Payment Service (port 5004)
app.use("/payments", createProxyMiddleware({
  target: SERVICES.payments,
  changeOrigin: true,
}));

// ─── Swagger Docs via Gateway ─────────────────────────────────────
// Forward /booking-service/api-docs to the Booking Service swagger
app.use("/booking-service/api-docs", createProxyMiddleware({
  target: SERVICES.bookings,
  changeOrigin: true,
  pathRewrite: { "^/booking-service/api-docs": "/api-docs" },
  on: {
    proxyRes: (proxyRes) => {
      // Prevent redirect from breaking the proxy path
      if (proxyRes.headers.location) {
        proxyRes.headers.location = proxyRes.headers.location.replace(
          "/api-docs",
          "/booking-service/api-docs"
        );
      }
    },
  },
}));

// ─── Gateway Info Page ────────────────────────────────────────────
>>>>>>> cdb157d (Add booking service and api gateway setup)
app.get("/", (req, res) => {
  res.json({
    service: "API Gateway",
    status: "running",
    routes: {
<<<<<<< HEAD
      movies:    "http://localhost:5000/api/movies",
      customers: "http://localhost:5000/api/customers",
      bookings:  "http://localhost:5000/bookings",
      payments:  "http://localhost:5000/api/payments",
    },
    swaggerDocs: {
      allServices: "http://localhost:5000/api-docs 🔥",
      movieService: "http://localhost:5000/movie-service/api-docs",
      customerService: "http://localhost:5000/customer-service/api-docs",
      bookingService: "http://localhost:5000/booking-service/api-docs",
      paymentService: "http://localhost:5000/payment-service/api-docs",
    },
  });
});

// ─── Start Server ─────────────────────────

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🌐 API Gateway running on port ${PORT}`);
=======
      movies:    "http://localhost:5000/movies",
      customers: "http://localhost:5000/customers",
      bookings:  "http://localhost:5000/bookings",
      payments:  "http://localhost:5000/payments",
    },
    swaggerDocs: {
      bookingService: "http://localhost:5000/booking-service/api-docs",
    },
    note: "All microservices are accessible through port 5000 only"
  });
});

// ─── Start Gateway ────────────────────────────────────────────────
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🌐 API Gateway running on port ${PORT}`);
  console.log(`📡 Routing: /bookings → port 5003, /movies → port 5001, /customers → port 5002, /payments → port 5004`);
  console.log(`📄 Booking Swagger via Gateway: http://localhost:${PORT}/booking-service/api-docs`);
>>>>>>> cdb157d (Add booking service and api gateway setup)
});