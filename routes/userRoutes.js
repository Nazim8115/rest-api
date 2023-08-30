const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const checkUserAuth = require("../middlewares/auth-middleware.js");

// route lavel middleware to protect route
router.use("/changepassword", checkUserAuth);

// public routes .......................
router.post("/register", UserController.userRegistration);
router.post("/login", UserController.userLogin);

// protected routes ....................
router.post("/changepassword", UserController.changeUserPassword);
module.exports = router;
