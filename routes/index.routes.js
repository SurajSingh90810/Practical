const express = require("express");
const user = require("../models/user.models");
const { userRegister } = require("../controller/user.controller");
const { verifyAdmin } = require("../middleware/tokenVerify");

const app = express.Router();


app.use("/user", require("./user.routes"));
app.use("/admin", require("./admin.routes"));
app.use("/category",verifyAdmin, require("./category.routes"));
app.use("/category",verifyAdmin, require("./category.routes"));
app.use("/product",verifyAdmin, require("./product.routes"));
module.exports = app;