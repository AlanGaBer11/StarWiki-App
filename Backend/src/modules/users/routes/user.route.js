const express = require("express");
const router = express.Router();
const UserController = require("@/modules/users/controllers/user.controller");
const validator = require("@/modules/users/validators/user.validator");

const userController = new UserController();

router
  .get("/getUsers", userController.findAllUsers.bind(userController))
  .get("/getUserById/:id", userController.findUserById.bind(userController))
  .post(
    "/createUser",
    validator,
    userController.createUser.bind(userController)
  )
  .patch("/updateUser/:id", userController.updateUser.bind(userController))
  .delete("/deleteUser/:id", userController.deleteUser.bind(userController));

module.exports = router;
