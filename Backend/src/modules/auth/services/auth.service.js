const RepositoryConfig = require("@/shared/config/repository");
const UserBuilder = require("@/modules/users/builders/user.builder");
const bcrypt = require("bcryptjs");

class AuthService {
  constructor() {
    this.AuthRepository = RepositoryConfig.getRepository("authRepository");
  }

  async register(userData) {
    try {
      const { nombre, apellido, nombre_usuario, email, contrasena } = userData;

      // Verificar que el usuario no exista por email
      const existingUser = await this.AuthRepository.findByEmail(email);
      if (existingUser) {
        throw new Error("El usuario ya está registrado con ese email");
      }

      // Aplicamos el builder
      const builder = new UserBuilder()
        .setNombre(nombre)
        .setApellido(apellido)
        .setNombreUsuario(nombre_usuario)
        .setEmail(email);

      if (contrasena) {
        await builder.setContrasena(contrasena);
      }

      const userToCreate = builder.build();

      // Creamos el usuario
      return await this.AuthRepository.register(userToCreate);
    } catch (error) {
      console.error("Error al registrar el usuario");
      throw error;
    }
  }

  async login(email, contrasena) {
    try {
      const user = await this.AuthRepository.findByEmail(email);
      if (!user) {
        throw new Error("El usuario no existe");
      }

      const isMatch = await bcrypt.compare(contrasena, user.contrasena);
      if (!isMatch) {
        throw new Error("Contraseña incorrecta");
      }

      return user;
    } catch (error) {
      console.error("Error al iniciar sesión");
      throw error;
    }
  }
}

module.exports = AuthService;
