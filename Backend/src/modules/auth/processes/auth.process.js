const AuthService = require("@/modules/auth/services/auth.service");

class AuthProcess {
  constructor() {
    this.AuthService = new AuthService();
  }

  async register(userData) {
    try {
      return await this.AuthService.register(userData);
    } catch (error) {
      console.error("Error al registrar usuario");
      throw error;
    }
  }

  async login(credentials) {
    try {
      const { email, contrasena } = credentials;
      return await this.AuthService.login(email, contrasena);
    } catch (error) {
      console.error("Error al iniciar sesión");
      throw error;
    }
  }

  async sendVerificationCode(email) {
    try {
      return await this.AuthService.sendVerificationCode(email);
    } catch (error) {
      console.error("Error al enviar el código de verificación");
      throw error;
    }
  }

  async verifyAccount(verificationData) {
    try {
      const { email, code } = verificationData;
      return await this.AuthService.verifiAccount(email, code);
    } catch (error) {
      console.error("Error al verificar la cuenta");
      throw error;
    }
  }
}

module.exports = AuthProcess;
