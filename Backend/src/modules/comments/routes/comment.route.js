const express = require("express");
const router = express.Router();
const CommentController = require("@/modules/comments/controllers/comment.controller");
const validator = require("@/modules/comments/validators/comment.validator");
const authMiddleware = require("@/shared/middlewares/auth.middleware");
const { checkRole } = require("@/shared/middlewares/rol.middleware");

const commentController = new CommentController();

router
  .get(
    "/getComments",
    authMiddleware,
    checkRole(["ADMIN", "EDITOR", "USER"]),
    commentController.findAllComments.bind(commentController)
  )
  .get(
    "/getCommentById/:id",
    authMiddleware,
    checkRole(["USER", "ADMIN", "EDITOR"]),
    commentController.findCommentById.bind(commentController)
  )
  .get(
    "/post/:id_post",
    authMiddleware,
    checkRole(["USER", "ADMIN", "EDITOR"]),
    commentController.findCommentsByPost.bind(commentController)
  )
  .post(
    "/createComment",
    validator,
    authMiddleware,
    checkRole(["USER", "ADMIN", "EDITOR"]),
    commentController.createComment.bind(commentController)
  )
  .patch(
    "/updateComment/:id",
    authMiddleware,
    checkRole(["ADMIN", "EDITOR", "USER"]),
    commentController.updateComment.bind(commentController)
  )
  .delete(
    "/deleteComment/:id",
    authMiddleware,
    checkRole(["ADMIN", "EDITOR"]),
    commentController.deleteComment.bind(commentController)
  );

module.exports = router;
