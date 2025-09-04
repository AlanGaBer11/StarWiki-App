const express = require("express");
const router = express.Router();
const PostController = require("@/modules/posts/controllers/post.controller");
const validator = require("@/modules/posts/validators/post.validator");

const postController = new PostController();

router
  .get("/getPosts", postController.findAllPosts.bind(postController))
  .get("/getPostById/:id", postController.findPostById.bind(postController))
  .get("/user/:id_usuario", postController.findPostsByUser.bind(postController))
  .get(
    "/category/:id_categoria",
    postController.findPostsByCategory.bind(postController)
  )
  .get("/search", postController.searchPosts.bind(postController))
  .post(
    "/createPost",
    validator,
    postController.createPost.bind(postController)
  )
  .patch(
    "/updatePost/:id",
    /* validator, */ postController.updatePost.bind(postController)
  )
  .delete("/deletePost/:id", postController.deletePost.bind(postController));

module.exports = router;
