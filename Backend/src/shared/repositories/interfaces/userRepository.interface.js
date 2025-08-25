const IBaseRepository = require("./baseRepository.interface");

class IUserRepository extends IBaseRepository {
  async findByEmail(email) {
    throw new Error("Method not implemented");
  }
  async findByName(name) {
    throw new Error("Method not implemented");
  }
  async deactivate(id) {
    throw new Error("Method not implemented");
  }
  async reactivate(id) {
    throw new Error("Method not implemented");
  }
}

module.exports = IUserRepository;
