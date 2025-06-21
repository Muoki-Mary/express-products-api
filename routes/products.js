const express = require("express");
const { v4: uuidv4 } = require("uuid");

const auth = require("../middleware/auth");
const validateProduct = require("../middleware/validateProduct");

const router = express.Router();

let products = [];

// GET all products (filter & pagination)
router.get("/", (req, res) => {
  let result = [...products];

  if (req.query.category) {
    result = result.filter((p) => p.category === req.query.category);
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || result.length;
  const start = (page - 1) * limit;
  const end = start + limit;

  res.json(result.slice(start, end));
});

// GET by ID
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// POST create
router.post("/", auth, validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update
router.put("/:id", auth, validateProduct, (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  const { name, description, price, category, inStock } = req.body;
  products[index] = {
    ...products[index],
    name,
    description,
    price,
    category,
    inStock,
  };
  res.json(products[index]);
});

// DELETE
router.delete("/:id", auth, (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  products.splice(index, 1);
  res.json({ message: "Product deleted" });
});

// SEARCH by name
router.get("/search/q", (req, res) => {
  const { q } = req.query;
  const result = products.filter((p) =>
    p.name.toLowerCase().includes(q.toLowerCase())
  );
  res.json(result);
});

// STATS
router.get("/stats/categories", (req, res) => {
  const stats = {};
  products.forEach((p) => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

module.exports = router;
