const express = require("express");
const router = express.Router();
const AuthController = require("@/modules/auth/controllers/auth.controller");
const validator = require("@/modules/auth/validators/auth.validator");

const authController = new AuthController();

router
  .post("/register", validator, authController.register.bind(authController))
  .post("/login", validator, authController.login.bind(authController))
  .post(
    "/send-verification-code",
    authController.sendVerificationCode.bind(authController)
  )
  .post("/verify-account", authController.verifyAccount.bind(authController))
  .post("/reset-password", authController.resetPassword.bind(authController));

module.exports = router;
