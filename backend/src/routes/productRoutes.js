const router = require("express").Router();
const controller = require("../controllers/productController");

const { verifyToken } = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware");

// Everyone logged in can view products
router.get("/", verifyToken, controller.getProducts);
router.get("/:id", verifyToken, controller.getProduct);

// Admin only
router.post("/", verifyToken, checkRole(["admin"]), controller.createProduct);

router.put("/:id", verifyToken, checkRole(["admin"]), controller.updateProduct);

router.delete("/:id", verifyToken, checkRole(["admin"]), controller.deleteProduct);

module.exports = router;
