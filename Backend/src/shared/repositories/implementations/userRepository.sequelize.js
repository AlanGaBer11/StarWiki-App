const IUserRepository = require("../../repositories/interfaces/userRepository.interface");
const User = require("../../models/User");

class UserRepository extends IUserRepository {
  // MÉTODOS
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
    return await User.findByPk(id, {
      attributes: {
        exclude: ["contrasena", "codigo_verificacion", "expiracion_codigo"],
      },
    });
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async findByUsername(nombre_usuario) {
    return await User.findOne({ where: { nombre_usuario } });
  }

  async create(userData) {
    return await User.create(userData);
  }

  async update(id, userData) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.update(userData);
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.destroy();
  }

  // SOLICITAR CODIGO DE VERIFICACIÓN
  async deactivate(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.update({ estado: false });
  }

  // SOLICITAR CODIGO DE VERIFICACIÓN
  async reactivate(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.update({ estado: true });
  }
}

module.exports = UserRepository;
