const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", protect, createProduct);
router.get("/readall", getAllProducts);
router.get("/readone/:id", getProduct);
router.put("/update/:id", protect, updateProduct);
router.delete("/delete/:id", protect, deleteProduct);

module.exports = router;
