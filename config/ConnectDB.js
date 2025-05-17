
const mongoose = require("mongoose");


const dbConnect = () => {
    mongoose.connect('mongodb+srv://singhsuraj90810:suraj123@cluster0.hz0vlj0.mongodb.net/Product')
    .then(()=> console.log("DB is Connected"))
    .catch((err) => console.log(err));
}

module.exports = dbConnect;