const express = require("express");
const { getCart, addToCart, removeFromCart } = require("../controllers/cart");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/cart", auth, getCart);
router.post("/cart", auth, addToCart);
router.delete("/cart/:id", auth, removeFromCart);

module.exports = router;
