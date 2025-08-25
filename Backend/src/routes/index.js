const express = require("express");
const router = express.Router();

// Importar rutas de módulos
const userRoutes = require("../modules/users/routes/user.route");

// Configurar rutas
router.use("/users", userRoutes);

module.exports = router;
