const ICategoryRepository = require("../interfaces/categoryRepository.interface");
const Category = require("../../models/Category");
const { Op } = require("sequelize");

class CategoryRepository extends ICategoryRepository {
  // MÉTODOS
  async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Category.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: {
        exclude: ["fecha_creacion"],
      },
      order: [["id", "ASC"]],
    });
    return {
      categories: rows,
      totalCategories: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  async findById(id) {
    return await Category.findByPk(id, {
      attributes: {
        exclude: ["fecha_creacion"],
      },
    });
  }

  async findByName(nombre) {
    return await Category.findOne({
      where: {
        nombre: {
          [Op.iLike]: `%${nombre}%`,
        },
      },
      attributes: {
        exclude: ["fecha_creacion"],
      },
    });
  }

  async create(categoryData) {
    return await Category.create(categoryData);
  }

  async update(id, categoryData) {
    const category = await Category.findByPk(id);
    if (!category) return null;
    return await category.update(categoryData);
  }

  async delete(id) {
    const category = await Category.findByPk(id);
    if (!category) return null;
    return await category.destroy();
  }
}
module.exports = CategoryRepository;
