const express = require("express");
const router = express.Router();

// Importar rutas de módulos
const userRoutes = require("@/modules/users/routes/user.route");
const categoryRoutes = require("@/modules/categories/routes/category.route");
const postRoutes = require("@/modules/posts/routes/post.route");

// Configurar rutas
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/posts", postRoutes);

module.exports = router;
