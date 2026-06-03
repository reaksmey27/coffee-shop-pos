const router = require("express").Router();
const controller = require("../controllers/productController");
const { verifyToken } = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware");

router.post("/", verifyToken, checkRole(["admin"]), controller.create);
router.put("/:id", verifyToken, checkRole(["admin"]), controller.update);
router.delete("/:id", verifyToken, checkRole(["admin"]), controller.remove);

module.exports = router;
