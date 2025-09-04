const CategoryProcess = require("@/modules/categories/processes/category.process");
class CategoryController {
  constructor() {
    this.CategoryProcess = new CategoryProcess();
  }

  async findAllCategories(req, res) {
    try {
      // Obtener parámetros de paginacion
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Validarf que los valores de paginación sean positivos
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
      const result = await this.CategoryProcess.findAllCategories(
        page,
        finalLimit
      );

      // Validar si se encontraron categorías
      if (!result.categories || result.categories.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No se encontraron categorías en esta página",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        message: "Categorías obtenidas exitosamente",
        categories: result.categories,
        pagination: {
          currentPage: page,
          totalPages: result.totalPages,
          totalCategories: result.totalCategories,
          categoriesPerPage: finalLimit,
          hasNextPage: page < result.totalPages,
          hasPreviousPage: page > 1,
        },
      });
    } catch (error) {
      console.error("Error al obtener todas las categorías:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al obtener las categorías",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async findCategoryById(req, res) {
    try {
      const { id } = req.params;
      // Llamar al proceso
      const category = await this.CategoryProcess.findCategoryById(id);

      // Verificar si la categoría existe
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Categoría no encontrada",
        });
      }
      // Enviar respuesta
      res.status(200).json({
        success: true,
        message: "Categoría obtenida exitosamente",
        category,
      });
    } catch (error) {
      console.error("Error al obtener la categoría:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al obtener la categoría",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async findCategoryByName(req, res) {
    try {
      const { nombre } = req.params;

      // Llamar al proceso
      const category = await this.CategoryProcess.findCategoryByName(nombre);

      // Verificar si la categoría existe
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Categoría no encontrada",
        });
      }
      // Enviar respuesta
      res.status(200).json({
        success: true,
        message: "Categoría obtenida exitosamente",
        category,
      });
    } catch (error) {
      console.error("Error al obtener la categoría:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al obtener la categoría",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async createCategory(req, res) {
    try {
      const { nombre, descripcion } = req.body;

      // Validaciones básicas
      if (!nombre || !descripcion) {
        return res.status(400).json({
          success: false,
          message: "Todos los campos son obligatorios",
        });
      }

      // Llamar al proceso
      const newCategory = await this.CategoryProcess.createCategory({
        nombre,
        descripcion,
      });

      // Enviar respuesta
      res.status(201).json({
        success: true,
        message: "Categoría creada exitosamente",
        newCategory,
      });
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      // Si es un error de nombre duplicado
      if (error.message === "La categoría ya existe") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al crear la categoría",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const categoryData = req.body;

      // Validar que al menos venga un campo para actualizar
      if (!categoryData || Object.keys(categoryData).length === 0) {
        return res.status(400).json({
          success: false,
          message: "Debes enviar al menos un campo para actualizar",
        });
      }

      // Llamar al proceso
      const updatedCategory = await this.CategoryProcess.updateCategory(
        id,
        categoryData
      );

      // Verificar si la categoría existe
      if (!updatedCategory) {
        return res.status(404).json({
          success: false,
          message: "Categoría no encontrada",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        message: "Categoría actualizada exitosamente",
        updatedCategory,
      });
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al actualizar la categoría",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      // Llamar al proceso
      const deletedCategory = await this.CategoryProcess.deleteCategory(id);

      // Verificar si la categoría existe
      if (!deletedCategory) {
        return res.status(404).json({
          success: false,
          message: "Categoría no encontrada",
        });
      }
      // Enviar respuesta
      res.status(200).json({
        success: true,
        message: "Categoría eliminada exitosamente",
      });
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al eliminar la categoría",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

module.exports = CategoryController;
