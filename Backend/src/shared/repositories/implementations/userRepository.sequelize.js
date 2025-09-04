const IUserRepository = require("@/shared/repositories/interfaces/userRepository.interface");
const User = require("@/shared/models/User");

class UserRepository extends IUserRepository {
  async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: {
        exclude: ["contrasena", "codigo_verificacion", "expiracion_codigo"],
      },
      order: [["id", "ASC"]],
    });
    return {
      users: rows,
      totalUsers: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  async findById(id) {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["contrasena", "codigo_verificacion", "expiracion_codigo"],
      },
    });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  }

  async findByEmal(email) {
    const user = await User.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  }

  async findByUsername(nombre_usuario) {
    const user = await User.findOne({
      where: { nombre_usuario: nombre_usuario },
    });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  }

  async create(userData) {
    const existingEmail = await User.findOne({
      where: { email: userData.email },
    });
    if (existingEmail) {
      throw new Error("El correo electrónico ya está en uso");
    }
    const existingUsername = await User.findOne({
      where: { nombre_usuario: userData.nombre_usuario },
    });
    if (existingUsername) {
      throw new Error("El nombre de usuario ya está en uso");
    }
    return await User.create(userData);
  }

  async update(id, userData) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return await user.update(userData);
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    if (user.rol && user.rol.toUpperCase() === "ADMIN") {
      throw new Error("No se puede eliminar un usuario con rol ADMIN");
    }
    return await user.destroy();
  }

  // ? DESACTIVAR
  // ? ACTIVAR
}

module.exports = UserRepository;
