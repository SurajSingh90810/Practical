const mongoose = require('mongoose');


const ProductSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    productImage: {
        type: String 
    }
});



const product = mongoose.model("Product", ProductSchema);

module.exports = product;