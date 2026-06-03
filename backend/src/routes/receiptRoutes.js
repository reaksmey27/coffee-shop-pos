const router = require("express").Router();
const controller = require("../controllers/orderController");

router.get("/:id", controller.getOne);

module.exports = router;
