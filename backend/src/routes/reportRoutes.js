const router = require("express").Router();
const controller = require("../controllers/reportController");

router.get("/sales", controller.getSalesReport);

module.exports = router;