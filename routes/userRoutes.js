const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const checkUserAuth = require("../middlewares/auth-middleware.js");

// route lavel middleware to protect route
router.use("/changepassword", checkUserAuth);
router.use("/getLoggedUserData", checkUserAuth);

// public routes .......................
router.post("/register", UserController.userRegistration);
router.post("/login", UserController.userLogin);
router.post(
  "/send-reset-password-email",
  UserController.sendUserPasswordResetEmail
);

router.post("/reset-password/:id/token", UserController.userPasswordReset);

// protected routes ....................
router.post("/changepassword", UserController.changeUserPassword);
router.get("/getLoggedUserData", UserController.getLoggedUserData);

module.exports = router;
