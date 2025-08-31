const express = require("express");
const router = express.Router();

// Importar rutas de módulos
const userRoutes = require("@/modules/users/routes/user.route");
const categoryRoutes = require("@/modules/categories/routes/category.route");

// Configurar rutas
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;
