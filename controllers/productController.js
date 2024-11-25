const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const product = await Product.create({
    name,
    description,
    price,
    user: req.user.id,
  });
  res.status(201).json({ product });
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Producto eliminado" });
};
