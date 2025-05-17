const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
   image:{
        type: String,  }
    },
  {
    timestamps: true,
    versionKey: false,
  }
);

const user = mongoose.model("User", userSchema);

module.exports = user;