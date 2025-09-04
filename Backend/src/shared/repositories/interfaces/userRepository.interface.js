const IBaseRepository = require("@/shared/repositories/interfaces/baseRepository.interface");

class IUserRepository extends IBaseRepository {
  async findByEmail(email) {
    throw new Error("Método no implementado");
  }

  async findByUsername(nombre_usuario) {
    throw new Error("Método no implementado");
  }

  async deactivate(id) {
    throw new Error("Método no implementado");
  }
  async reactivate(id) {
    throw new Error("Método no implementado");
  }
}

module.exports = IUserRepository;
