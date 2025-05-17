const express = require("express");
const { userRegister, userLogin, viewUserProduct, viewProductsByCategory } = require("../controller/user.controller");
const imageUpload = require("../middleware/imageUpload");
const { verifyUser } = require("../middleware/tokenVerify");
const app = express.Router();


app.post("/register",imageUpload.single("image"), userRegister);
app.get("/login",  imageUpload.single("image"),userLogin);
app.get("/user-view-product", verifyUser,viewUserProduct);
app.get("/category-wise-view/:categoryId", verifyUser,viewProductsByCategory);

module.exports = app;