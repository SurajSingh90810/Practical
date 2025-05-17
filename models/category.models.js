const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
  },
  categoryImage: {
    type: String,
  },
});
const Category =mongoose.model("Category", categorySchema);
module.exports = Category