const IUserRepository = require("@/shared/repositories/interfaces/userRepository.interface");
const User = require("@/shared/models/User");

class AuthRepository extends IUserRepository {
  // MÉTODO PARA REGISTRAR UN USUARIO
  async register(userData) {
    return await User.create(userData);
  }

  // MÉTODO PARA INICIAR SESIÓN
  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }
}

module.exports = AuthRepository;
