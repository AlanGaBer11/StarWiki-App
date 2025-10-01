const express = require("express");
const router = express.Router();

// Importar rutas de módulos
const authRoutes = require("@/modules/auth/routes/auth.route");
const userRoutes = require("@/modules/users/routes/user.route");
const categoryRoutes = require("@/modules/categories/routes/category.route");
const postRoutes = require("@/modules/posts/routes/post.route");
const commentRoutes = require("@/modules/comments/routes/comment.route");

// Configurar rutas
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
