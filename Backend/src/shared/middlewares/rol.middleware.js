const checkRole = (roles) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          success: false,
          status: 401,
          message: "Usuario no encontrado",
        });
      }

      if (!roles.includes(user.rol)) {
        return res.status(403).json({
          success: false,
          status: 403,
          message: "No tienes permiso para realzar esta acción",
        });
      }
      next();
    } catch (error) {
      console.error("Error al verificar el rol:", error);
      res.status(500).json({
        success: false,
        status: 500,
        message: "Error al verificar el rol",
      });
    }
  };
};

module.exports = { checkRole };
