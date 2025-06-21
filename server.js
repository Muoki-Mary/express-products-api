const express = require("express");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/products");
const logger = require("./middleware/logger");
const errorHandler = require("./utils/errorHandler");

const app = express();
const PORT = 3000;

// Middleware
app.use(logger);
app.use(bodyParser.json());

// Routes
app.use("/api/products", productRoutes);

// Hello World route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
