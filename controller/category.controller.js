const Category=require("../models/category.models")
const path = require("path");
const fs = require("fs");
const Product=require("../models/product.models")


exports.categoryRegister = async (req, res) => {
  try {
    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }
    req.body.categoryImage = imagePath;
    let category = await Category.create(req.body);
    return res.status(201).json({ message: "Category added successfully", data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


exports.getAllCategory = async (req, res) => {
  try {
    let categories = await Category.find({});
    return res.status(200).json({ data: categories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


exports.updateCategory = async (req, res) => {
  try {
    let id = req.params.id;
    let category = await Category.findById(id);
    if (category) {
      if (req.file) {
        if (category.categoryImage != "") {
          let imagePath = path.join(__dirname, "..", category.categoryImage);
          try {
            await fs.unlinkSync(imagePath);
          } catch (error) {
            console.log("File missing...");
          }
        }
        let filePath = `/uploads/${req.file.filename}`;
        req.body.categoryImage = filePath;
      }
      let updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({ message: "Category updated successfully", data: updatedCategory });
    } else {
      return res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    let id = req.params.id;
    let category = await Category.findById(id);
    if (category) {
      if (category.categoryImage != "") {
        let imagePath = path.join(__dirname, "..", category.categoryImage);
        try {
          await fs.unlinkSync(imagePath);
        } catch (error) {
          console.log("File missing...");
        }
      }
      await Category.findByIdAndDelete(id);
      await Product.deleteMany({ categoryId: id });

      return res.status(200).json({ message: "Category deleted successfully" });
    } else {
      return res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

