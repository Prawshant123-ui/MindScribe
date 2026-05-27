const mongoose = require("mongoose");

const connectDB = async (req, res) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully!!!");
  } catch (error) {
    console.log(error.message, "Database connection failed!!!");
    process.exit(1);
  }
};

module.exports=connectDB
