const express = require("express");
const router = express.Router();
const CommentController = require("@/modules/comments/controllers/comment.controller");
const validator = require("@/modules/comments/validators/comment.validator");

const commentController = new CommentController();

router
  .get(
    "/getComments",
    commentController.findAllComments.bind(commentController)
  )
  .get(
    "/getCommentById/:id",
    commentController.findCommentById.bind(commentController)
  )
  .get(
    "/post/:id_post",
    commentController.findCommentsByPost.bind(commentController)
  )
  .post(
    "/createComment",
    validator,
    commentController.createComment.bind(commentController)
  )
  .patch(
    "/updateComment/:id",
    /* validator, */
    commentController.updateComment.bind(commentController)
  )
  .delete(
    "/deleteComment/:id",
    commentController.deleteComment.bind(commentController)
  );

module.exports = router;
