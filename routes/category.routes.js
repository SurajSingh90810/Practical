const express = require("express");
const uploadImage = require("../middleware/imageUpload");
const { categoryRegister, getAllCategory, updateCategory, deleteCategory } = require("../controller/category.controller");

const route = express.Router();

route.post(
  "/add-category",
  uploadImage.single("categoryImage"),
  categoryRegister
);
route.get("/view-category", getAllCategory );
route.put(
  "/update-category/:id",
  uploadImage.single("categoryImage"),updateCategory
);

route.delete("/delete-category/:id", deleteCategory);

module.exports = route;