const UserProcess = require("../processes/user.process");
const {
  handleError,
  validatePagination,
  isOwnerOrAdmin,
} = require("../../../shared/utils/controller.utils");

class UserController {
  constructor() {
    this.UserProcess = new UserProcess();
  }

  async findAllUsers(req, res) {
    try {
      const { page, limit } = validatePagination(req.query);

      // Llamar al proceso
      const result = await this.UserProcess.findAllUsers(page, limit);

      // Validar si se encontraron usuarios
      if (!result.users?.length) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "No se encontraron usuarios en esta página",
        });
      }

      res.status(200).json({
        success: true,
        status: 200,
        message: "Usuarios obtenidos exitosamente",
        pagination: {
          currentPage: page,
          totalPages: result.totalPages,
          totalUsers: result.totalUsers,
          usersPerPage: limit,
          hasNextPage: page < result.totalPages,
          hasPreviousPage: page > 1,
        },
        users: result.users,
      });
    } catch (error) {
      handleError(res, error, "obtener todos los usuarios");
    }
  }

  async findUserById(req, res) {
    try {
      const { id } = req.params;

      // Buscar el usuario
      const user = await this.UserProcess.findUserById(id);
      if (!user) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Usuario no encontrado",
        });
      }

      // Verificar si el usuario esta intentando acceder a su perfil
      if (!isOwnerOrAdmin(req, id)) {
        return res.status(403).json({
          success: false,
          status: 403,
          message: "No tienes permiso para acceder a este perfil",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Usuario obtenido exitosamente",
        user,
      });
    } catch (error) {
      handleError(res, error, "obtener el usuario");
    }
  }

  async createUser(req, res) {
    try {
      const { nombre, apellido, nombre_usuario, email, contrasena, rol } =
        req.body;
      // Validaciones básicas
      if (
        !nombre ||
        !apellido ||
        !nombre_usuario ||
        !email ||
        !contrasena ||
        !rol
      ) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Todos los campos son obligatorios",
        });
      }
      // Llamar al proceso
      const newUser = await this.UserProcess.createUser({
        nombre,
        apellido,
        nombre_usuario,
        email,
        contrasena,
        rol,
      });
      res.status(201).json({
        success: true,
        status: 201,
        message: "Usuario creado exitosamente",
        newUser,
      });
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      // Si es un error de email duplicado
      if (error.message === "El correo electrónico ya está en uso") {
        return res.status(404).json({
          success: false,
          status: 404,
          message: error.message,
        });
      }
      if (error.message === "El nombre de usuario ya está en uso") {
        return res.status(404).json({
          success: false,
          status: 404,
          message: error.message,
        });
      }
      res.status(500).json({
        success: false,
        status: 500,
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

      // Buscar el usuario
      const existingUser = await this.UserProcess.findUserById(id);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "Usuario no encontrado",
        });
      }

      // Verificar si el usuario esta intentando actualizar su propio perfil
      if (!isOwnerOrAdmin(req, id)) {
        return res.status(403).json({
          success: false,
          status: 403,
          message: "Solo puedes actualizar tu propio perfil",
        });
      }

      // Si no es admin, no puede cambiar su propio rol
      if (userData.rol && req.user.rol !== "ADMIN") {
        return res.status(403).json({
          success: false,
          status: 403,
          message: "No tienes permiso para cambiar roles",
        });
      }

      // Validar que al menos venga un campo para actualizar
      if (!userData || Object.keys(userData).length === 0) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Debes enviar al menos un campo para actualizar",
        });
      }

      // Llamar al proceso
      const updatedUser = await this.UserProcess.updateUser(id, userData);

      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Usuario actualizado exitosamente",
        updatedUser,
      });
    } catch (error) {
      handleError(res, error, "actualizar usuario");
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      // Buscar usuario primero
      const existingUser = await this.UserProcess.findUserById(id);
      if (!existingUser) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "Usuario no encontrado",
        });
      }

      // Solo admins pueden eliminar
      if (req.user.rol !== "ADMIN") {
        return res.status(403).json({
          status: 403,
          success: false,
          message: "No tienes permiso para eliminar usuarios",
        });
      }

      // Proceder a eliminar
      await this.UserProcess.deleteUser(id);

      res.status(200).json({
        success: true,
        status: 200,
        message: "Usuario eliminado exitosamente",
      });
    } catch (error) {
      handleError(res, error, "eliminar el usuario");
    }
  }

  async deactivateUser(req, res) {
    try {
      const { id } = req.params;
      const { code } = req.body;

      // Validar que venga el codigo
      if (!code) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Debes enviar el codigo de verificacion",
        });
      }

      //Buscar usuario
      const existingUser = await this.UserProcess.findUserById(id);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "Usuario no encontrado",
        });
      }

      // Verificar si el usuario esta desactivando su cuenta
      if (!isOwnerOrAdmin(req, id)) {
        return res.status(403).json({
          success: false,
          status: 403,
          message: "Solo puedes desactivar tu cuenta",
        });
      }

      // Desactivar usuario
      await this.UserProcess.deactivateUser(id, { code });
      res.status(200).json({
        success: true,
        status: 200,
        message: "Usuario desactivado exitosamente",
      });
    } catch (error) {
      handleError(res, error, "desactivar el usuario");
    }
  }

  async reactivateUser(req, res) {
    try {
      const { id } = req.params;
      const { code } = req.body;

      // Validar que venga el codigo
      if (!code) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Debes enviar el codigo de verificacion",
        });
      }

      // Buscar usuario
      const existingUser = await this.UserProcess.findUserById(id);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "Usuario no encontrado ",
        });
      }

      // Verificar si el usuario esta reactivando su cuenta
      if (!isOwnerOrAdmin(req, id)) {
        return res.status(403).json({
          success: false,
          status: 403,
          message: "Solo puedes reactivar tu cuenta",
        });
      }
      // Reactivar usuario
      await this.UserProcess.reactivateUser(id, { code });
      res.status(200).json({
        success: true,
        status: 200,
        message: "Usuario reactivado exitosamente",
      });
    } catch (error) {
      handleError(res, error, "reactivar el usuario");
    }
  }
}

module.exports = UserController;
