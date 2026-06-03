const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Coffee Shop POS API Running",
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Frontend connected to backend 🎉",
  });
});

module.exports = app;