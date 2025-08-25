const bcrypt = require("bcryptjs");
const RepositoryConfig = require("@/shared/config/repository");

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
      const { contrasena, rol } = userData;

      // HASHEAR CONTRASEÑA
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(contrasena, salt);

      // Preparar datos del usuario
      const userToCreate = {
        ...userData,
        contrasena: hashedPassword,
        verificado: rol !== "USER", // Admin esta verificado por defecto
        estado: true, // Activo por defecto
      };

      return await this.userRepository.create(userToCreate);
    } catch (error) {
      console.error("Error al crear el usuario");
      throw error;
    }
  }

  async updateUser(id, userData) {
    try {
      const { contrasena } = userData;
      let dataToUpdate = { ...userData };

      // Hashear la nueva contraseña si se proporciona
      if (contrasena) {
        const salt = await bcrypt.genSalt(10);
        dataToUpdate.contrasena = await bcrypt.hash(contrasena, salt);
      }

      return await this.userRepository.update(id, dataToUpdate);
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
