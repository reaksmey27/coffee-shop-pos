const router = require("express").Router();
const controller = require("../controllers/inventoryController");

router.get("/", controller.getAll);
router.post("/", controller.create);
router.put("/:id", controller.updateStock);

module.exports = router;