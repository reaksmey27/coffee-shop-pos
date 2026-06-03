const router = require("express").Router();
const controller = require("../controllers/orderController");

router.post("/", controller.createOrder);
router.get("/", controller.getOrders);
router.put("/:id/status", controller.updateStatus);

module.exports = router;