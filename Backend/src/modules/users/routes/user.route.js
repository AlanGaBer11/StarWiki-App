const express = require("express");
const router = express.Router();
const UserController = require("@/modules/users/controllers/user.controller");
const validator = require("@/modules/users/validators/user.validator");
const authMiddleware = require("@/shared/middlewares/auth.middleware");
const { checkRole } = require("@/shared/middlewares/rol.middleware");

const userController = new UserController();

router
  .get(
    "/getUsers",
    authMiddleware,
    checkRole(["ADMIN"]),
    userController.findAllUsers.bind(userController)
  )
  .get(
    "/getUserById/:id",
    authMiddleware,
    checkRole(["ADMIN", "USER", "EDITOR"]),
    userController.findUserById.bind(userController)
  )
  .post(
    "/createUser",
    validator,
    authMiddleware,
    checkRole(["ADMIN"]),
    userController.createUser.bind(userController)
  )
  .patch(
    "/updateUser/:id",
    /* validator, */
    authMiddleware,
    checkRole(["ADMIN", "USER", "EDITOR"]),
    userController.updateUser.bind(userController)
  )
  .delete(
    "/deleteUser/:id",
    authMiddleware,
    checkRole(["ADMIN"]),
    userController.deleteUser.bind(userController)
  )
  .patch(
    "/deactivateUser/:id",
    authMiddleware,
    userController.deactivateUser.bind(userController)
  )
  .patch(
    "/reactivateUser/:id",
    authMiddleware,
    userController.reactivateUser.bind(userController)
  );

module.exports = router;
