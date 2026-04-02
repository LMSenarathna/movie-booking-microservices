/*const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// ─── Service URLs ─────────────────────────
const SERVICES = {
  movies:    "http://localhost:5002",
  customers: "http://localhost:5001",
  bookings:  "http://localhost:5003",
  payments:  "http://localhost:5004",
};

// ─── Proxy Routes ─────────────────────────

// 🎬 Movie Service (FINAL WORKING FIX)
app.use(
  "/api/movies",
  createProxyMiddleware({
    target: "http://localhost:5002",
    changeOrigin: true,
    router: () => "http://localhost:5002/api/movies"
  })
);

// 👤 Customer Service (UNCHANGED)
app.use(
  "/api/customers",
  createProxyMiddleware({
    target: "http://localhost:5001",
    changeOrigin: true,
    pathRewrite: {
      "^/api/customers": "/api/customers"
    },
    logLevel: "debug"
  })
);

// 📘 Booking Service (UNCHANGED)
app.use("/bookings", createProxyMiddleware({
  target: SERVICES.bookings,
  changeOrigin: true,
}));

// 💳 Payment Service (UNCHANGED)
app.use("/payments", createProxyMiddleware({
  target: SERVICES.payments,
  changeOrigin: true,
}));

// ─── Swagger Docs via Gateway ─────────────────

// 📘 Booking Swagger (UNCHANGED)
app.use("/booking-service/api-docs", createProxyMiddleware({
  target: SERVICES.bookings,
  changeOrigin: true,
  pathRewrite: { "^/booking-service/api-docs": "/api-docs" },
  on: {
    proxyRes: (proxyRes) => {
      if (proxyRes.headers.location) {
        proxyRes.headers.location = proxyRes.headers.location.replace(
          "/api-docs",
          "/booking-service/api-docs"
        );
      }
    },
  },
}));


// 🎬 Movie Swagger (CORRECT)
app.use(
  "/movie-service",
  createProxyMiddleware({
    target: "http://localhost:5002",
    changeOrigin: true,
    pathRewrite: {
      "^/movie-service": ""
    }
  })
);


// 👤 Customer Swagger

app.use(
  "/customer-service/api-docs",
  createProxyMiddleware({
    target: "http://localhost:5001",
    changeOrigin: true,
    pathRewrite: {
      "^/customer-service/api-docs": "/api-docs"
    },
    logLevel: "debug"
  })
);




// ─── Gateway Info ─────────────────────────

app.get("/", (req, res) => {
  res.json({
    service: "API Gateway",
    status: "running",
    routes: {
      movies:    "http://localhost:5000/api/movies",
      customers: "http://localhost:5000/customers",
      bookings:  "http://localhost:5000/bookings",
      payments:  "http://localhost:5000/payments",
    },
    swaggerDocs: {
      bookingService: "http://localhost:5000/booking-service/api-docs",
      movieService:   "http://localhost:5000/movie-service/api-docs",
      customers: "http://localhost:5000/customer-service/api-docs",
    },
    note: "All microservices accessible via port 5000"
  });
});

// ─── Start Server ─────────────────────────

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🌐 API Gateway running on port ${PORT}`);
});*/




/*const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// ─── Service URLs ─────────────────────────
const SERVICES = {
  movies:    "http://localhost:5002",
  customers: "http://localhost:5001",
  bookings:  "http://localhost:5003",
  payments:  "http://localhost:5004",
};

// ─── Proxy Routes ─────────────────────────

// 🎬 Movie Service (FIXED - removed router ❗)
app.use(
  "/api/movies",
  createProxyMiddleware({
    target: SERVICES.movies,
    changeOrigin: true,
  })
);

// 👤 Customer Service (FIXED ❗)
app.use(
  "/api/customers",
  createProxyMiddleware({
    target: SERVICES.customers,
    changeOrigin: true,
  })
);

// 📘 Booking Service (UNCHANGED)
app.use(
  "/bookings",
  createProxyMiddleware({
    target: SERVICES.bookings,
    changeOrigin: true,
  })
);

// 💳 Payment Service 
app.use(
  "/api/payments",
  createProxyMiddleware({
    target: "http://localhost:5004",
    changeOrigin: true,
  })
);

// ─── Swagger Docs via Gateway ─────────────────

// 📘 Booking Swagger (UNCHANGED)
app.use(
  "/booking-service/api-docs",
  createProxyMiddleware({
    target: SERVICES.bookings,
    changeOrigin: true,
    pathRewrite: {
      "^/booking-service/api-docs": "/api-docs",
    },
  })
);

// 🎬 Movie Swagger (UNCHANGED)
app.use(
  "/movie-service",
  createProxyMiddleware({
    target: SERVICES.movies,
    changeOrigin: true,
    pathRewrite: {
      "^/movie-service": "",
    },
  })
);

// 👤 Customer Swagger (ADDED ❗)
app.use(
  "/customer-service",
  createProxyMiddleware({
    target: SERVICES.customers,
    changeOrigin: true,
    pathRewrite: {
      "^/customer-service": "",
    },
  })
);

// Payment Swagger
app.use(
  "/payment-service",
  createProxyMiddleware({
    target: "http://localhost:5004",
    changeOrigin: true,
    pathRewrite: {
      "^/payment-service": "",
    },
  })
);

// ─── Gateway Info ─────────────────────────

app.get("/", (req, res) => {
  res.json({
    service: "API Gateway",
    status: "running",
    routes: {
      movies:    "http://localhost:5000/api/movies",
      customers: "http://localhost:5000/api/customers", // FIXED ❗
      bookings:  "http://localhost:5000/bookings",
      payments:  "http://localhost:5000/payments",
    },
    swaggerDocs: {
      movieService:   "http://localhost:5000/movie-service/api-docs",
      bookingService: "http://localhost:5000/booking-service/api-docs",
      customerService:"http://localhost:5000/customer-service/api-docs", // ADDED ❗
    },
    note: "All microservices accessible via port 5000",
  });
});

// ─── Start Server ─────────────────────────

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🌐 API Gateway running on port ${PORT}`);
});*/


const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const swaggerUi = require("swagger-ui-express");
const axios = require("axios");

const app = express();

// ─── Service URLs ─────────────────────────
const SERVICES = {
  movies:    "http://localhost:5002",
  customers: "http://localhost:5001",
  bookings:  "http://localhost:5003",
  payments:  "http://localhost:5004",
};

// ─── Proxy Routes ─────────────────────────

// 🎬 Movie Service
app.use(
  "/api/movies",
  createProxyMiddleware({
    target: SERVICES.movies,
    changeOrigin: true,
  })
);

// 👤 Customer Service
app.use(
  "/api/customers",
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
  "/api/payments",
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

app.get("/", (req, res) => {
  res.json({
    service: "API Gateway",
    status: "running",
    routes: {
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
});