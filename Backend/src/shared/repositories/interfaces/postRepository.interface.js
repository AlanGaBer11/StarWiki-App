const IBaseRepository = require("@/shared/repositories/interfaces/baseRepository.interface");

class IPostRepository extends IBaseRepository {
  async findByTitle(titulo) {
    throw new Error("Método no implementado");
  }

  async findByUser(id_usuario) {
    throw new Error("Método no implementado");
  }

  async findByCategory(id_categoria) {
    throw new Error("Método no implementado");
  }

  async search(query) {
    throw new Error("Método no implementado");
  }
}

module.exports = IPostRepository;
