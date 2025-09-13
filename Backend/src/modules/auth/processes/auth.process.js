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
}

module.exports = AuthProcess;
