const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    const dbOption = {
      dbName: "restapi",
    };
    await mongoose.connect(url, dbOption);
    console.log("database connect sucessfully...");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
