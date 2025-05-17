const express = require('express');
const uploadImage = require('../middleware/imageUpload');
const { addProduct, viewAllProduct, updateProduct, deleteProduct } = require('../controller/product.controller');
 const routes = express.Router();
 
routes.post("/add-product",uploadImage.single("productImage"),addProduct)
 
routes.get("/view-product", viewAllProduct);
 

routes.put("/update-product/:id",uploadImage.single("productImage"),updateProduct)
routes.delete("/delete-product/:id", deleteProduct);
 
 module.exports = routes;