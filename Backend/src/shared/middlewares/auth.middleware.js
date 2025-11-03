const jwt = require("jsonwebtoken");
const User = require("@/shared/models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // Obtener el token del headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Acceso Denegado, Token Requerido.",
      });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Obtener el usuario completo de la BD
    const user = await User.findByPk(decoded.id, {
      attributes: {
        exclude: ["contrasena", "codigo_verificacion", "expiracion_codigo"],
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Usuario no encontrado",
      });
    }

    // Agregar el usuario completo a la request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      status: 401,
      message: "Token Invalido",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
