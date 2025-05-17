const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/admin.models");

exports.adminRegister = async (req, res) => {
  try {
    const checkAdmin = await Admin.findOne({ email: req.body.email });

    if (checkAdmin) {
      return res.status(400).json({ message: "Admin Already Exist." });
    }

    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }
    req.body.adminImage = imagePath;
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    const admin = await Admin.create({ ...req.body, password: hashPassword });

    return res
      .status(201)
      .json({ message: "Admin Register Succesfully", data: admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.Adminlogin = async (req, res) => {
  try {
    let admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(400).json({ message: "User not Found" });
    }
    let matchPassword = await bcrypt.compare(req.body.password, admin.password);
    if (!matchPassword) {
      return res
        .status(400)
        .json({ message: "Email and Password is Incorrect" });
    }

    let token = await jwt.sign(
      { adminId: admin._id, email: admin.email },
      "test"
    );

    return res.status(200).json({ message: "Login Successfully", token,admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};