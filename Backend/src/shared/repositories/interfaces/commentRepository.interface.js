const IBaseRepository = require("@/shared/repositories/interfaces/baseRepository.interface");

class ICommentRepository extends IBaseRepository {
  async findCommentsByPost(id_post) {
    throw new Error("Método no implementado");
  }
}

module.exports = ICommentRepository;
