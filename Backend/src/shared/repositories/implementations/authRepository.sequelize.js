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

  // MÉTODO PARA ENVIAR CÓDIGO DE VERIFICACIÓN
  async verificationCode(email, codigo_verificacion, expiracion_codigo) {
    return await User.update(
      { codigo_verificacion, expiracion_codigo },
      { where: { email } }
    );
  }

  // MÉTODO PARA VERIFICAR UN USUARIO
  async verifyUser(email, userData) {
    return await User.update(userData, { where: { email } });
  }

  // MÉTODO PARA RECUPERAR CONTRASEÑA
  async resetPassword(email, userData) {
    return await User.update(userData, { where: { email } });
  }
}

module.exports = AuthRepository;
