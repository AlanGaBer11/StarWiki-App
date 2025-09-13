const express = require("express");
const router = express.Router();
const AuthController = require("@/modules/auth/controllers/auth.controller");

const authController = new AuthController();

router
  .post("/register", authController.register.bind(authController))
  .post("/login", authController.login.bind(authController));

module.exports = router;
