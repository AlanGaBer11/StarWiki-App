class IBaseRepository {
  async findAll() {
    throw new Error("Método no implementado");
  }
  async findById(id) {
    throw new Error("Método no implementado");
  }
  async create(data) {
    throw new Error("Método no implementado");
  }
  async update(id, data) {
    throw new Error("Método no implementado");
  }
  async delete(id) {
    throw new Error("Método no implementado");
  }
}

module.exports = IBaseRepository;
