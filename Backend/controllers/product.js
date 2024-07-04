const Product = require("../models/product");

//  get all product without auth
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(400).send("Error retrieving products");
  }
};

// fetch products with id means for project detail
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.send(product);
  } catch (err) {
    res.status(400).send("Error retrieving product");
  }
};

// add product that is for admin
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    if (!name || !description || !price || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProduct = new Product({ name, description, price, image });
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// update with the id by the admin
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.send(product);
  } catch (err) {
    res.status(400).send("Error updating product");
  }
};

// delete product that do admin with the id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.send("Product deleted");
  } catch (err) {
    res.status(400).send("Error deleting product");
  }
};
