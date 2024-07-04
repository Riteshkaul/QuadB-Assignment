const express = require("express");
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", auth, admin, addProduct);
router.put("/products/:id", auth, admin, updateProduct);
router.delete("/products/:id", auth, admin, deleteProduct);

module.exports = router;
