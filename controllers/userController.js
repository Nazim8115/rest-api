const UserModel = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  // new user registration

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

          const saved_user = UserModel.findOne({ email: email });
          //   generate jwt tiken
          const token = jwt.sign(
            { userID: saved_user._id },
            process.env.jwt_secret_key,
            { expiresIn: "3d" }
          );

          res.status(201).send({
            status: "success",
            message: "registration successfull",
            token: token,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  //   user login

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            // generate jwt token
            const token = jwt.sign(
              { userID: user._id },
              process.env.jwt_secret_key,
              { expiresIn: "3d" }
            );

            res.send({
              status: "success",
              message: "Login success",
              token: token,
            });
          } else {
            res.send({
              status: "failed",
              message: "email or password not matched",
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "you are not a registered user",
          });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   change password

  static changeUserPassword = async (req, res) => {
    const { password } = req.body;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const newhashedPassword = await bcrypt.hash(password, salt);
      await UserModel.findByIdAndUpdate(req.user._id, {
        $set: { password: newhashedPassword },
      });

      res.send({ status: "success", message: "password changed successfully" });
    } else {
      res.send({ status: "all fields are required" });
    }
  };
}

module.exports = UserController;
