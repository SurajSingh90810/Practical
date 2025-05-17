const express = require("express");
const imageUpload = require("../middleware/imageUpload");
const { adminRegister, Adminlogin } = require("../controller/admin.controller");
const app = express.Router();


app.post("/register", imageUpload.single("adminImage"), adminRegister);
app.get("/login",Adminlogin);

module.exports = app;