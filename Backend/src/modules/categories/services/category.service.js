const RepositoryConfig = require("@/shared/config/repository");
const CategoryBuilder = require("@/modules/categories/builders/category.builder");

class CategoryService {
  constructor() {
    this.CategoryRepository =
      RepositoryConfig.getRepository("categoryRepository");
  }

  async findAllCategories(page = 1, limit = 10) {
    try {
      const categories = await this.CategoryRepository.findAll(page, limit);
      if (!categories || categories.categories.length === 0) {
        throw new Error("No se encontraron categorías");
      }
      return categories;
    } catch (error) {
      console.error("Error al obtener todas las categorías");
      throw error;
    }
  }

  async findCategoryById(id) {
    try {
      const category = await this.CategoryRepository.findById(id);
      if (!category) {
        throw new Error("Categoría no encontrada");
      }
      return category;
    } catch (error) {
      console.error("Error al obtener la categoría");
      throw error;
    }
  }

  async findCategoryByName(nombre) {
    try {
      const category = await this.CategoryRepository.findByName(nombre);
      if (!category) {
        throw new Error("Categoría no encontrada");
      }
      return category;
    } catch (error) {
      console.error("Error al obtener la categoría");
      throw error;
    }
  }

  async createCategory(categoryData) {
    try {
      const { nombre, descripcion } = categoryData;

      // Validar si el nombre ya existe
      const existingCategory = await this.CategoryRepository.findByName(nombre);
      if (existingCategory) {
        throw new Error("El nombre de la categoría ya está en uso");
      }

      // Builder para construir la categoría
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
      const { nombre, descripcion, fecha_actualizacion } = categoryData;

      // Verificar si la categoría existe
      const existingCategory = await this.CategoryRepository.findById(id);
      if (!existingCategory) {
        throw new Error("Categoría no encontrada");
      }

      // Validar si el nombre ya existe
      const existingCategoryByName = await this.CategoryRepository.findByName(
        nombre
      );
      if (existingCategoryByName && existingCategoryByName.id !== id) {
        throw new Error("El nombre de la categoría ya está en uso");
      }

      const builder = new CategoryBuilder()
        .setNombre(nombre)
        .setDescripcion(descripcion)
        .setFechaActualizacion(fecha_actualizacion || new Date());

      let categoryToUpdate = builder.build();

      return await this.CategoryRepository.update(id, categoryToUpdate);
    } catch {
      console.error("Error al actualizar la categoría");
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      const category = await this.CategoryRepository.findById(id);
      if (!category) {
        throw new Error("Categoría no encontrada");
      }
      return await this.CategoryRepository.delete(id);
    } catch (error) {
      console.error("Error al eliminar la categoría");
      throw error;
    }
  }
}

module.exports = CategoryService;
