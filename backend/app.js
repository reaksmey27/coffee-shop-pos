const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/products", require("./src/routes/productRoutes"));
app.use("/api/orders", require("./src/routes/orderRoutes"));

module.exports = app;