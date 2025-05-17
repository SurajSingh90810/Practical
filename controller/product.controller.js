const Product = require("../models/product.models");
const path = require("path");
const fs = require("fs");

exports.addProduct = async (req, res) => {
  try {
    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    req.body.productImage = imagePath;

    if (!req.body.categoryId) {
      return res.status(400).json({ message: "Category is required" });
    }

    let product = await Product.create(req.body);
    return res.status(201).json({
      message: "Product added successfully",
      data: product
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error adding product" });
  }
};


exports.viewAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ data: products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching products" });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Product.findById(id);
    if (product) {
      if (product.productImage != "") {
        let imagePath = path.join(__dirname, "..", product.productImage);
        try {
          await fs.unlinkSync(imagePath);
        } catch (error) {
          console.log("File missing...");
        }
      }
      await Product.findByIdAndDelete(id);
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error deleting product" });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let updatedData = {
      productName: req.body.productName,
      price: req.body.price,
      categoryId: req.body.categoryId,
      subcategoryId: req.body.subcategoryId,
      extraCategoryId: req.body.extraCategoryId,
      description: req.body.description,
      quantity: req.body.quantity,
    };

    if (req.file) {
      if (product.productImage && product.productImage !== "") {
        let imagePath = path.join(__dirname, "..", product.productImage);
        try {
          await fs.unlinkSync(imagePath);
        } catch (error) {
          console.log("Error deleting old image:", error);
        }
      }
      updatedData.productImage = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    return res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct
    });
  } catch (error) {
    console.log("Update error:", error);
    return res.status(500).json({ message: "Error updating product" });
  }
};