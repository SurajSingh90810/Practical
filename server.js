const express = require("express");
const dbConnect = require("./config/ConnectDB");
const app = express();
const PORT = 8000;

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.use(express.json());
dbConnect();

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));


app.use("/", require("./routes/index.routes"));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});