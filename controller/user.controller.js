const User=require("../models/user.models")
const bcrypt = require("bcrypt"); 
const jwt=require("jsonwebtoken");
const Product = require("../models/product.models");


exports.userRegister = async (req, res) => {
  try {
    const checkUser = await User.findOne({ email: req.body.email });

    if (checkUser) {
      return res.status(400).json({ message: "User Already Exists." });
    }

    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }
    req.body.userImage = imagePath;
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashPassword });

    return res
      .status(201)
      .json({ message: "User Registered Successfully", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};




exports.userLogin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }
    let matchPassword = await bcrypt.compare(req.body.password, user.password);
    if (!matchPassword) {
      return res
        .status(400)
        .json({ message: "Email and Password is Incorrect" });
    }

    let token = await jwt.sign(
      { userId: user._id, email: user.email },
      "test"
    );

    return res.status(200).json({ message: "Login Successfully", token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.viewUserProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ data: products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching products" });
  }
};



exports.viewProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ categoryId });
    return res.status(200).json({ data: products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching products by category" });
  }
};