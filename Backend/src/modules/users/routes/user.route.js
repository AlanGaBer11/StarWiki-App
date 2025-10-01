const express = require("express");
const router = express.Router();
const UserController = require("@/modules/users/controllers/user.controller");
const validator = require("@/modules/users/validators/user.validator");
const authorization = require("@/shared/middlewares/auth.middleware");
const { checkRole } = require("@/shared/middlewares/rol.middleware");

const userController = new UserController();

router
  .get(
    "/getUsers",
    authorization,
    checkRole(["ADMIN"]),
    userController.findAllUsers.bind(userController)
  )
  .get(
    "/getUserById/:id",
    authorization,
    checkRole(["ADMIN", "USER"]),
    userController.findUserById.bind(userController)
  )
  .post(
    "/createUser",
    validator,
    authorization,
    checkRole(["ADMIN"]),
    userController.createUser.bind(userController)
  )
  .patch(
    "/updateUser/:id",
    /* validator, */
    authorization,
    checkRole(["ADMIN", "USER"]),
    userController.updateUser.bind(userController)
  )
  .delete(
    "/deleteUser/:id",
    authorization,
    checkRole(["ADMIN"]),
    userController.deleteUser.bind(userController)
  );

module.exports = router;
