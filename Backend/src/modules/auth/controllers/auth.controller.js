const AuthProcess = require("@/modules/auth/processes/auth.process");
const jwt = require("jsonwebtoken");

class AuthController {
  constructor() {
    this.AuthProcess = new AuthProcess();
  }

  async register(req, res) {
    try {
      const { nombre, apellido, nombre_usuario, email, contrasena } = req.body;

      if (!nombre || !apellido || !nombre_usuario || !email || !contrasena) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Todos los campos son obligatorios",
        });
      }

      const newUser = await this.AuthProcess.register({
        nombre,
        apellido,
        nombre_usuario,
        email,
        contrasena,
      });

      return res.status(201).json({
        success: true,
        status: 201,
        message: "Usuario registrado correctamente",
        newUser,
      });
    } catch (error) {
      console.error("Error al registrar el usuario:", error);

      if (
        error.message === "El email ya está registrado" ||
        error.message === "El nombre de usuario ya está en uso"
      ) {
        return res.status(409).json({
          success: false,
          status: 409,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        status: 500,
        message: "Error interno del servidor al registrar el usuario",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, contrasena } = req.body;

      if (!email || !contrasena) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "El email y la contraseña son obligatorios",
        });
      }

      const user = await this.AuthProcess.login({ email, contrasena });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Inicio de sesión exitoso",
        token,
        user,
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      if (
        error.message === "El usuario no existe" ||
        error.message === "Contraseña incorrecta"
      ) {
        return res.status(401).json({
          success: false,
          status: 401,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        status: 500,
        message: "Error interno del servidor al iniciar sesión",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async sendVerificationCode(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "El email es requerido",
        });
      }

      await this.AuthProcess.sendVerificationCode(email);

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Código de verificación enviado correctamente",
      });
    } catch (error) {
      console.error("Error al enviar el código de verificación:", error);

      if (error.message === "El usuario no existe") {
        return res.status(404).json({
          success: false,
          status: 404,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        status: 500,
        message: "Error interno del servidor al enviar el código",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async verifyAccount(req, res) {
    try {
      const { email, code } = req.body;

      if (!email || !code) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "El email y el código son requeridos",
        });
      }

      await this.AuthProcess.verifyAccount({ email, code });

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Cuenta verificada exitosamente",
      });
    } catch (error) {
      console.error("Error al verificar la cuenta:", error);

      const knownErrors = [
        "Usuario no encontrado",
        "El usuario ya está verificado",
        "No hay un código de verificación pendiente",
        "El código de verificación ha expirado",
        "Código de verificación inválido",
      ];

      if (knownErrors.includes(error.message)) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        status: 500,
        message: "Error interno del servidor al verificar la cuenta",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

module.exports = AuthController;
