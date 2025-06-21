module.exports = (req, res, next) => {
  const apiKey = req.headers["authorization"];
  if (apiKey !== "Bearer mytoken") {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
};
