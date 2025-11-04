const CategoryService = require("../services/category.service");

class CategoryProcess {
  constructor() {
    this.CategoryService = new CategoryService();
  }

  async findAllCategories(page, limit) {
    try {
      return await this.CategoryService.findAllCategories(page, limit);
    } catch (error) {
      console.error("Error al obtener todas las categorías");
      throw error;
    }
  }

  async findCategoryById(id) {
    try {
      return await this.CategoryService.findCategoryById(id);
    } catch (error) {
      console.error("Error al obtrener la categoría");
      throw error;
    }
  }

  async findCategoryByName(nombre) {
    try {
      return await this.CategoryService.findCategoryByName(nombre);
    } catch (error) {
      console.error("Error al obtener la categoría");
      throw error;
    }
  }

  async createCategory(categoryData) {
    try {
      return await this.CategoryService.createCategory(categoryData);
    } catch (error) {
      console.error("Error al crear la categoría");
      throw error;
    }
  }

  async updateCategory(id, categoryData) {
    try {
      return await this.CategoryService.updateCategory(id, categoryData);
    } catch (error) {
      console.error("Error al actualizar la categoría");
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      return await this.CategoryService.deleteCategory(id);
    } catch (error) {
      console.error("Error al eliminar la categoría");
      throw error;
    }
  }
}

module.exports = CategoryProcess;
