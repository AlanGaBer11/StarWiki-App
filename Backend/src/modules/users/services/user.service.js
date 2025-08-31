const RepositoryConfig = require("@/shared/config/repository");
const UserBuilder = require("@/modules/users/builders/user.builder");

class UserService {
  constructor() {
    this.userRepository = RepositoryConfig.getRepository("user");
  }

  async findAllUsers(page = 1, limit = 10) {
    try {
      return await this.userRepository.findAll(page, limit);
    } catch (error) {
      console.error("Error al obtener todos los usuarios");
      throw error;
    }
  }

  async findUserById(id) {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      console.error("Error al obtener el usuario");
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const { nombre, apellido, email, contrasena, rol } = userData;

      // Aplicamos el builder
      const builder = new UserBuilder()
        .setNombre(nombre)
        .setApellido(apellido)
        .setEmail(email)
        .setRol(rol)
        .setEstado(true)
        .setVerificado(rol !== "USER");

      if (contrasena) {
        await builder.setContrasena(contrasena);
      }

      const userToCreate = builder.build();

      // Creamos el usuario
      return await this.userRepository.create(userToCreate);
    } catch (error) {
      console.error("Error al crear el usuario");
      throw error;
    }
  }

  async updateUser(id, userData) {
    try {
      const {
        nombre,
        apellido,
        email,
        contrasena,
        rol,
        avatar_url,
        biografia,
      } = userData;

      const builder = new UserBuilder()
        .setNombre(nombre)
        .setApellido(apellido)
        .setEmail(email)
        .setRol(rol)
        .setAvatarUrl(avatar_url)
        .setBiografia(biografia);

      if (contrasena) {
        await builder.setContrasena(contrasena);
      }

      const userToUpdate = builder.build();

      return await this.userRepository.update(id, userToUpdate);
    } catch (error) {
      console.error("Error al actualizar el usuario");
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      console.error("Error al eliminar el usuario");
      throw error;
    }
  }
}

module.exports = UserService;
