const IBaseRepository = require("./baseRepository.interface");

class ICategoryRepository extends IBaseRepository {
  findByName(nombre) {
    throw new Error("Método no implementado");
  }
}

module.exports = ICategoryRepository;
