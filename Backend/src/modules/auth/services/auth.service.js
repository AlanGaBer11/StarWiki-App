const RepositoryConfig = require("@/shared/config/repository");
const UserBuilder = require("@/modules/users/builders/user.builder");

class AuthService {
  constructor() {
    this.AuthRepository = RepositoryConfig.getRepository("authRepository");
  }

  async register(userData) {
    try {
      const { nombre, apellido, nombre_usuario, email, contrasena } = userData;

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
      return await this.AuthRepository.login(email, contrasena);
    } catch (error) {
      console.error("Error al iniciar sesión");
      throw error;
    }
  }
}

module.exports = AuthService;
