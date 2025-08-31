const ICategoryRepository = require("@/shared/repositories/interfaces/categoryRepository.interface");
const Category = require("@/shared/models/Category");
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
    const category = await Category.findByPk(id, {
      attributes: {
        exclude: ["fecha_creacion"],
      },
    });
    if (!category) {
      throw new Error("Categoría no encontrada");
    }
    return category;
  }

  async findByName(nombre) {
    const category = await Category.findOne({
      where: {
        nombre: {
          [Op.iLike]: `%${nombre}%`,
        },
      },
      attributes: {
        exclude: ["fecha_creacion"],
      },
    });
    if (!category) {
      throw new Error("Categoría no encontrada");
    }
    return category;
  }

  async create(categoryData) {
    const existingCategory = await Category.findOne({
      where: { nombre: categoryData.nombre },
    });
    if (existingCategory) {
      throw new Error("La categoría ya existe");
    }
    return await Category.create(categoryData);
  }

  async update(id, categoryData) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error("Categoría no encontrada");
    }
    return await category.update(categoryData);
  }

  async delete(id) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error("Categoría no encontrada");
    }
    return await category.destroy();
  }
}
module.exports = CategoryRepository;
