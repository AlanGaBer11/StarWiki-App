const RepositoryConfig = require("@/shared/config/repository");
const CategoryBuilder = require("@/modules/categories/builders/category.builder");

class CategoryService {
  constructor() {
    this.CategoryRepository = RepositoryConfig.getRepository("category");
  }

  async findAllCategories(page = 1, limit = 10) {
    try {
      return await this.CategoryRepository.findAll(page, limit);
    } catch (error) {
      console.error("Error al obtener todas las categorías");
      throw error;
    }
  }

  async findCategoryById(id) {
    try {
      return await this.CategoryRepository.findById(id);
    } catch (error) {
      console.error("Error al obtener la categoría");
      throw error;
    }
  }

  async findCategoryByName(nombre) {
    try {
      return await this.CategoryRepository.findByName(nombre);
    } catch (error) {
      console.error("Error al obtener la categoría");
      throw error;
    }
  }

  async createCategory(categoryData) {
    try {
      const { nombre, descripcion } = categoryData;

      // Aplicamos el builder
      const builder = new CategoryBuilder()
        .setNombre(nombre)
        .setDescripcion(descripcion);

      const categoryToCreate = builder.build();

      // Creamos la categoría
      return await this.CategoryRepository.create(categoryToCreate);
    } catch (error) {
      console.error("Error al crear la categoría");
      throw error;
    }
  }

  async updateCategory(id, categoryData) {
    try {
      const { nombre, descripcion } = categoryData;

      const builder = new CategoryBuilder()
        .setNombre(nombre)
        .setDescripcion(descripcion);

      const categoryToUpdate = builder.build();

      return await this.CategoryRepository.update(id, categoryToUpdate);
    } catch {
      console.error("Error al actualizar la categoría");
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      return await this.CategoryRepository.delete(id);
    } catch (error) {
      console.error("Error al eliminar la categoría");
      throw error;
    }
  }
}

module.exports = CategoryService;
