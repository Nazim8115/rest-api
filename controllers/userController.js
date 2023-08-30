const UserModel = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static userRegistration = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.send({ status: "failed", message: "email already exists" });
    } else {
      if (username && password && email) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const doc = new UserModel({
            username: username,
            email: email,
            password: hashedPassword,
          });
          await doc.save();
          res
            .status(201)
            .send({ status: "success", message: "registration successfull " });
        } catch (error) {
          console.log(error);
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };
}

module.exports = UserController;
