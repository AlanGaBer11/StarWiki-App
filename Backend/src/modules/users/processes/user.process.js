const UserService = require("../services/user.service");

class UserProcess {
  constructor() {
    this.UserService = new UserService();
  }

  async findAllUsers(page, limit) {
    try {
      return await this.UserService.findAllUsers(page, limit);
    } catch (error) {
      console.error("Error al obtener todos los usuarios");
      throw error;
    }
  }
  async findUserById(id) {
    try {
      return await this.UserService.findUserById(id);
    } catch (error) {
      console.error("Error al obtener el usuario");
      throw error;
    }
  }

  async createUser(userData) {
    try {
      return await this.UserService.createUser(userData);
    } catch (error) {
      console.error("Error al crear el usuario");
      throw error;
    }
  }

  async updateUser(id, userData) {
    try {
      return await this.UserService.updateUser(id, userData);
    } catch (error) {
      console.error("Error al actualizar el usuario");
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      return await this.UserService.deleteUser(id);
    } catch (error) {
      console.error("Error al eliminar el usuario");
      throw error;
    }
  }

  async deactivateUser(id, verificationData) {
    try {
      const { code } = verificationData;
      return await this.UserService.deactivateUser(id, code);
    } catch (error) {
      console.error("Error al desactivar el usuario");
      throw error;
    }
  }

  async reactivateUser(id, verificationData) {
    try {
      const { code } = verificationData;
      return await this.UserService.reactivateUser(id, code);
    } catch (error) {
      console.error("Error al reactivar el usuario");
      throw error;
    }
  }
}

module.exports = UserProcess;
