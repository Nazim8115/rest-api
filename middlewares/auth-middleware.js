const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.js");

var checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      // verify token
      const { userID } = jwt.verify(token, process.env.jwt_secret_key);

      // get user from token
      req.user = await UserModel.findById(userID).select("-password");
      next();
    } catch (error) {
      res.status(401).send({ status: "failed", message: "UnAuthorized user" });
    }
  }
  if (!token) {
    res.status(401).send({ status: "UnAutorized User ,No token " });
  }
};

// exports

module.exports = checkUserAuth;
