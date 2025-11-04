const IBaseRepository = require("../interfaces/baseRepository.interface");

class IUserRepository extends IBaseRepository {
  async register(userData) {
    throw new Error("Método no implementado");
  }
  async login(email, contrasena) {
    throw new Error("Método no implementado");
  }

  async findByEmail(email) {
    throw new Error("Método no implementado");
  }

  async findByUsername(nombre_usuario) {
    throw new Error("Método no implementado");
  }

  async verificationCode(email) {
    throw new Error("Método no implementado");
  }

  async verifyUser(userData) {
    throw new Error("Método no implementado");
  }

  async deactivate(id) {
    throw new Error("Método no implementado");
  }
  async reactivate(id) {
    throw new Error("Método no implementado");
  }

  async resetPassword(email, verificationCode, newPassword) {
    throw new Error("Método no implementado");
  }
}

module.exports = IUserRepository;
