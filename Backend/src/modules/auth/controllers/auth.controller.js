const AuthProcess = require("@/modules/auth/processes/auth.process");
const jwt = require("jsonwebtoken");

class AuthController {
  constructor() {
    this.AuthProcess = new AuthProcess();
  }

  async register(req, res) {
    try {
      const { nombre, apellido, nombre_usuario, email, contrasena } = req.body;

      // Validaciones básicas
      if (!nombre || !apellido || !nombre_usuario || !email || !contrasena) {
        return res.status(400).json({
          succes: false,
          message: "Todos los campos son obligatorios",
        });
      }

      // Llamar al proceso
      const newUser = await this.AuthProcess.register({
        nombre,
        apellido,
        nombre_usuario,
        email,
        contrasena,
      });

      // Enviar respuesta
      res.status(201).json({
        succes: true,
        message: "Usuario registrado",
        newUser,
      });
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      // Si es un error de email duplicado
      if (error.message === "El email ya está registrado") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }
      // Si es un error de nombre_usuario_duplicado
      if (error.message === "El nombre de usuario ya está en uso") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al registrar el usuario",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, contrasena } = req.body;

      // Validar
      if (!email || !contrasena) {
        return res.status(400).json({
          succes: false,
          message: "Todos los campos son obligatorios",
        });
      }

      // Llamar al proceso
      const user = await this.AuthProcess.login({ email, contrasena });

      // Generar token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });

      // Enviar respuesta
      res.status(200).json({
        succes: true,
        message: "Inicio de sesión exitoso",
        token,
        user,
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // Si el error es de autenticación, enviamos 401
      if (
        error.message === "El usuario no existe" ||
        error.message === "Contraseña incorrecta"
      ) {
        return res.status(401).json({ success: false, message: error.message });
      }

      res.status(500).json({
        success: false,
        message: "Error interno del servidor al iniciar sesión",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

module.exports = AuthController;
