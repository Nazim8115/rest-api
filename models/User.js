const mongoose = require("mongoose");

// define schema........

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Model
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
