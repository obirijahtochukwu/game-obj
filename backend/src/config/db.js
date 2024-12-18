const mongoose = require("mongoose");

const URL = "mongodb+srv://obj:obj123,.@cluster0.nfbux.mongodb.net/";

const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

module.exports = connectDB;