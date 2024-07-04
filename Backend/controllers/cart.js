const Cart = require("../models/cart");

// get cart without auth
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id })
      .populate("items.productId")
      .exec();
    if (!cart) {
      return res.status(404).send("Cart not found");
    }
    // console.log(cart);
    const cartItems = cart.items;

    return res.status(200).json({ items: cartItems });
  } catch (error) {
    console.error("Error retrieving cart:", error);
    return res.status(500).send("Error retrieving cart");
  }
};

// this is for add to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  console.log("Authenticated user ID:", req.user._id);

  if (!productId || !quantity) {
    return res.status(400).send("Product ID and quantity are required.");
  }
  console.log("Received payload:", req.body);

  try {
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Item exists in cart, update the quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Item does not exist, add new item
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).send("Internal server error");
  }
};
//  remove cart  with id
exports.removeFromCart = async (req, res) => {
  // console.log(req.params.id);
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() != req.params.id
    );

    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).send("Error removing item from cart");
  }
};
