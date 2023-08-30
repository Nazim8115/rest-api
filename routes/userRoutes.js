const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");

// public routes .............
router.post("/register", UserController.userRegistration);

module.exports = router;
