const IUserRepository = require("@/shared/repositories/interfaces/userRepository.interface");
const User = require("@/shared/models/User");
const bcrypt = require("bcryptjs");

class AuthRepository extends IUserRepository {
  // MÉTODO PARA REGISTRAR UN USUARIO
  async register(userData) {
    const { email, nombre_usuario } = userData;

    // Verificar si el email existe
    const existingEmail = await User.findOne({
      where: { email: email },
    });

    if (existingEmail) {
      throw new Error("El email ya está registrado");
    }

    // Verificar si el nombre_usuario ya existe
    const existingUsername = await User.findOne({
      where: { nombre_usuario: nombre_usuario },
    });

    if (existingUsername) {
      throw new Error("El nombre de usuario ya está en uso");
    }

    // Crear el usuario
    return await User.create(userData);
  }

  // MÉTODO PARA INICIAR SESIÓN
  async login(email, contrasena) {
    // Buscar el usuario por email
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error("El usuario no existe");
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch) {
      throw new Error("Contraseña incorrecta");
    }
    return user;
  }
}

module.exports = AuthRepository;
