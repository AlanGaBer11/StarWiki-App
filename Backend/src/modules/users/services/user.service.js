const RepositoryConfig = require("@/shared/config/repository");
const UserBuilder = require("@/modules/users/builders/user.builder");

class UserService {
  constructor() {
    this.UserRepository = RepositoryConfig.getRepository("userRepository");
  }

  async findAllUsers(page = 1, limit = 10) {
    try {
      const users = await this.UserRepository.findAll(page, limit);
      if (!users || users.users.length === 0) {
        throw new Error("No se encontraron usuarios");
      }
      return users;
    } catch (error) {
      console.error("Error al obtener todos los usuarios");
      throw error;
    }
  }

  async findUserById(id) {
    try {
      const user = await this.UserRepository.findById(id);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return user;
    } catch (error) {
      console.error("Error al obtener el usuario");
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const { nombre, apellido, nombre_usuario, email, contrasena, rol } =
        userData;

      // Validar si el correo ya esta en uso
      const existingEmail = await this.UserRepository.findByEmail(email);
      if (existingEmail) {
        throw new Error("El correo electrónico ya está en uso");
      }

      // Validar si el nombre de usuario ya esta en uso
      const existingUsername = await this.UserRepository.findByUsername(
        nombre_usuario
      );
      if (existingUsername) {
        throw new Error("El nombre de usuario ya está en uso");
      }

      // Builder para construir el objeto usuario
      const builder = new UserBuilder()
        .setNombre(nombre)
        .setApellido(apellido)
        .setNombreUsuario(nombre_usuario)
        .setEmail(email)
        .setRol(rol)
        .setEstado(true)
        .setVerificado(rol !== "USER");

      if (contrasena) {
        await builder.setContrasena(contrasena);
      }

      const userToCreate = builder.build();

      return await this.UserRepository.create(userToCreate);
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
        nombre_usuario,
        email,
        contrasena,
        rol,
        avatar_url,
        biografia,
      } = userData;

      // Verificar si existe el usuario
      const existingUser = await this.UserRepository.findById(id);
      if (!existingUser) {
        throw new Error("Usuario no encontrado");
      }

      // Validar email si cambió
      if (email && email !== existingUser.email) {
        const emailInUse = await this.UserRepository.findByEmail(email);
        if (emailInUse) {
          throw new Error("El correo electrónico ya está en uso");
        }
      }

      // Validar username si cambió
      if (nombre_usuario && nombre_usuario !== existingUser.nombre_usuario) {
        const usernameInUse = await this.UserRepository.findByUsername(
          nombre_usuario
        );
        if (usernameInUse) {
          throw new Error("El nombre de usuario ya está en uso");
        }
      }

      // Builder para preparar los datos
      const builder = new UserBuilder()
        .setNombre(nombre)
        .setApellido(apellido)
        .setNombreUsuario(nombre_usuario)
        .setEmail(email)
        .setRol(rol)
        .setAvatarUrl(avatar_url)
        .setBiografia(biografia);

      if (contrasena) {
        await builder.setContrasena(contrasena);
      }

      let userToUpdate = builder.build();

      // Filtrar undefined para no sobreescribir campos con null
      userToUpdate = Object.fromEntries(
        Object.entries(userToUpdate).filter(([_, value]) => value !== undefined)
      );

      return await this.UserRepository.update(id, userToUpdate);
    } catch (error) {
      console.error("Error al actualizar el usuario");
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.UserRepository.findById(id);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      // Validación de no eliminar ADMINS
      if (user.rol && user.rol.toUpperCase() === "ADMIN") {
        throw new Error("No se puede eliminar un usuario con rol ADMIN");
      }

      return await this.UserRepository.delete(id);
    } catch (error) {
      console.error("Error al eliminar el usuario");
      throw error;
    }
  }
}

module.exports = UserService;
