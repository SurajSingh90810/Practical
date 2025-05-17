const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.models");
const User=require("../models/user.models")


exports.verifyAdmin = async (req, res, next) => {
  let authorization = req.headers["authorization"];

  if (!authorization) {
    return res.json({ message: "Please Login" });
  }
  let token = authorization.split(" ")[1];
  let { adminId, email } = await jwt.verify(token, "test");
  console.log(adminId, email);
  let admin = await Admin.findById(adminId);
  if (admin) {
    req.admin = admin;
    next();
  } else {
    return res.json({ message: "Invalid Token" });
  }
};


exports.verifyUser = async (req, res, next) => {
  let authorization = req.headers["authorization"];

  if (!authorization) {
    return res.json({ message: "Please Login" });
  }
  let token = authorization.split(" ")[1];
  let { userId, email } = await jwt.verify(token, "test");
  console.log(userId, email);
  let user = await User.findById(userId);
  if (user) {
    req.user = user;
    next();
  } else {
    return res.json({ message: "Invalid Token" });
  }
};