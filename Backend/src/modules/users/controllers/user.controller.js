const UserProcess = require("@/modules/users/processes/user.process");

class UserController {
  constructor() {
    this.UserProcess = new UserProcess();
  }

  async findAllUsers(req, res) {
    try {
      // Obtener parámetros de paginación
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      //Validar que los valores son positivos
      if (page < 1 || limit < 1) {
        return res.status(400).json({
          success: false,
          message: "Los valores de page y limit deben ser números positivos",
        });
      }

      // Limitar el máximo de elementos por página
      const maxLimit = 100;
      const finalLimit = limit > maxLimit ? maxLimit : limit;

      // Llamar al proceso
      const result = await this.UserProcess.findAllUsers(page, finalLimit);

      // Validar si se encontraron usuarios
      if (!result.users || result.users.length == 0) {
        return res.status(404).json({
          success: false,
          message: "No se encontraron usuarios en esta página",
        });
      }

      res.status(200).json({
        success: true,
        message: "Usuarios obtenidos exitosamente",
        users: result.users,
        pagination: {
          currentPage: page,
          totalPages: result.totalPages,
          totalUsers: result.totalUsers,
          usersPerPage: finalLimit,
          hasNextPage: page < result.totalPages,
          hasPreviousPage: page > 1,
        },
      });
    } catch (error) {
      console.error("Error al obtener todos los usuarios:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al obtener los usuarios",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async findUserById(req, res) {
    try {
      const { id } = req.params;
      // Llamar al proceso
      const user = await this.UserProcess.findUserById(id);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Usuario no encontrado",
        });
      }
      res.status(200).json({
        success: true,
        message: "Usuario obtenido exitosamente",
        data: user,
      });
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al obtener el usuario",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async createUser(req, res) {
    try {
      const { nombre, apellido, email, contrasena, rol } = req.body;
      // Validaciones básicas
      if (!nombre || !apellido || !email || !contrasena || !rol) {
        return res.status(400).json({
          success: false,
          message: "Todos los campos son obligatorios",
        });
      }
      // Llamar al proceso
      const newUser = await this.UserProcess.createUser({
        nombre,
        apellido,
        email,
        contrasena,
        rol,
      });
      res.status(201).json({
        success: true,
        message: "Usuario creado exitosamente",
        data: newUser,
      });
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      // Si es un error de email duplicado
      if (error.message === "El correo electrónico ya está en uso") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al crear el usuario",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const userData = req.body;

      // Validar que al menos venga un campo para actualizar
      if (!userData || Object.keys(userData).length === 0) {
        return res.status(400).json({
          success: false,
          message: "Debes enviar al menos un campo para actualizar",
        });
      }

      // Llamar al proceso
      const updatedUser = await this.UserProcess.updateUser(id, userData);

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
      }

      res.status(200).json({
        success: true,
        message: "Usuario actualizado exitosamente",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al actualizar usuario",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await this.UserProcess.deleteUser(id);
      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
      }
      res.status(200).json({
        success: true,
        message: "Usuario eliminado exitosamente",
      });
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al eliminar el usuario",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

module.exports = UserController;
