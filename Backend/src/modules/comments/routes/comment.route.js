const express = require("express");
const router = express.Router();
const CommentController = require("@/modules/comments/controllers/comment.controller");
const validator = require("@/modules/comments/validators/comment.validator");
const authorization = require("@/shared/middlewares/auth.middleware");
const { checkRole } = require("@/shared/middlewares/rol.middleware");

const commentController = new CommentController();

router
  .get(
    "/getComments",
    authorization,
    checkRole(["ADMIN", "EDITOR"]),
    commentController.findAllComments.bind(commentController)
  )
  .get(
    "/getCommentById/:id",
    authorization,
    checkRole(["USER", "ADMIN", "EDITOR"]),
    commentController.findCommentById.bind(commentController)
  )
  .get(
    "/post/:id_post",
    authorization,
    checkRole(["USER", "ADMIN", "EDITOR"]),
    commentController.findCommentsByPost.bind(commentController)
  )
  .post(
    "/createComment",
    authorization,
    checkRole(["USER", "ADMIN", "EDITOR"]),
    commentController.createComment.bind(commentController)
  )
  .patch(
    "/updateComment/:id",
    authorization,
    checkRole(["ADMIN", "EDITOR", "USER"]),
    commentController.updateComment.bind(commentController)
  )
  .delete(
    "/deleteComment/:id",
    authorization,
    checkRole(["ADMIN"]),
    commentController.deleteComment.bind(commentController)
  );

module.exports = router;
