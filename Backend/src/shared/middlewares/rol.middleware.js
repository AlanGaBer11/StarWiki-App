const checkRole = (roles) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Usuario no encontrado",
        });
      }

      if (!roles.includes(user.rol)) {
        return res.status(403).json({
          success: false,
          message: "No tienes permiso para realzar esta acción",
        });
      }
      next();
    } catch (error) {
      console.error("Error al verificar el rol:", error);
      res.status(500).json({
        success: false,
        message: "Error al verificar el rol",
      });
    }
  };
};

module.exports = { checkRole };
