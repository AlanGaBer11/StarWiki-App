const CategoryProcess = require("../processes/category.process");
const {
  handleError,
  validatePagination,
} = require("../../../shared/utils/controller.utils");
class CategoryController {
  constructor() {
    this.CategoryProcess = new CategoryProcess();
  }

  async findAllCategories(req, res) {
    try {
      const { page, limit } = validatePagination(req.query);

      // Llamar al proceso
      const result = await this.CategoryProcess.findAllCategories(page, limit);

      // Validar si se encontraron categorías
      if (!result.categories?.length) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "No se encontraron categorías en esta página",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Categorías obtenidas exitosamente",
        pagination: {
          currentPage: page,
          totalPages: result.totalPages,
          totalCategories: result.totalCategories,
          categoriesPerPage: limit,
          hasNextPage: page < result.totalPages,
          hasPreviousPage: page > 1,
        },
        categories: result.categories,
      });
    } catch (error) {
      handleError(res, error, "obtener todas las categorías");
    }
  }

  async findCategoryById(req, res) {
    try {
      const { id } = req.params;

      // Buscar la categoría
      const category = await this.CategoryProcess.findCategoryById(id);
      if (!category) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Categoría no encontrada",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Categoría obtenida exitosamente",
        category,
      });
    } catch (error) {
      handleError(res, error, "obtener la categoría");
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
          status: 400,
          message: "Categoría no encontrada",
        });
      }
      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Categoría obtenida exitosamente",
        category,
      });
    } catch (error) {
      handleError(res, error, "obtener la categoría");
    }
  }

  async createCategory(req, res) {
    try {
      const { nombre, descripcion } = req.body;

      // Validaciones básicas
      if (!nombre || !descripcion) {
        return res.status(400).json({
          success: false,
          status: 400,
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
        status: 201,
        message: "Categoría creada exitosamente",
        newCategory,
      });
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      // Si es un error de nombre duplicado
      if (error.message === "La categoría ya existe") {
        return res.status(400).json({
          success: false,
          status: 400,
          message: error.message,
        });
      }
      res.status(500).json({
        success: false,
        status: 500,
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

      // Buscar la categoría
      const existingCategory = await this.CategoryProcess.findCategoryById(id);
      if (!existingCategory) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "Categoría no encontrada",
        });
      }
      // Validar que al menos venga un campo para actualizar
      if (!categoryData || Object.keys(categoryData).length === 0) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Debes enviar al menos un campo para actualizar",
        });
      }

      // Llamar al proceso
      const updatedCategory = await this.CategoryProcess.updateCategory(
        id,
        categoryData
      );

      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Categoría actualizada exitosamente",
        updatedCategory,
      });
    } catch (error) {
      handleError(res, error, "actualizar la categoría");
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      // Buscar la categoría
      const existingCategory = await this.CategoryProcess.findCategoryById(id);
      if (!existingCategory) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "Categoría no encontrada",
        });
      }

      // Solo admins pueden eliminar
      if (req.user.rol !== "ADMIN") {
        return res.status(403).json({
          status: 403,
          success: false,
          message: "No tienes permiso para eliminar categorías",
        });
      }

      // Llamar al proceso
      await this.CategoryProcess.deleteCategory(id);

      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Categoría eliminada exitosamente",
      });
    } catch (error) {
      handleError(res, error, "eliminar la categoría");
    }
  }
}

module.exports = CategoryController;
