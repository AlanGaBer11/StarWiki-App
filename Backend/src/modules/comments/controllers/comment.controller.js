const CommentProcess = require("../processes/comment.process");
const {
  handleError,
  validatePagination,
  isOwnerOrAdmin,
} = require("../../../shared/utils/controller.utils");

class CommentController {
  constructor() {
    this.CommentProcess = new CommentProcess();
  }

  async findAllComments(req, res) {
    try {
      const { page, limit } = validatePagination(req.query);

      // Llamar al proceso
      const result = await this.CommentProcess.findAllComments(page, limit);

      // Validar si se encontraron comentarios
      if (!result.comments?.length) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "No se encontraron comentarios en esta página",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Comentarios obtenidos exitosamente",
        pagination: {
          currentPage: page,
          totalPages: result.totalPages,
          totalComments: result.totalComments,
          commentsPerPage: limit,
          hasNextPage: page < result.totalPages,
          hasPreviousPage: page > 1,
        },
        comments: result.comments,
      });
    } catch (error) {
      handleError(res, error, "obtener todos los comentarios");
    }
  }

  async findCommentById(req, res) {
    try {
      const { id } = req.params;

      // Llamar al proceso
      const comment = await this.CommentProcess.findCommentById(id);

      // Verificar si se encuentran comentarios
      if (!comment) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "Comentario no encontrado",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Comentario obtenido exitosamente",
        comment,
      });
    } catch (error) {
      handleError(res, error, "obtener el comentario");
    }
  }

  async findCommentsByPost(req, res) {
    try {
      const { id_post } = req.params;

      // Llamar al proceso
      const comments = await this.CommentProcess.findCommentsByPost(id_post);

      // Verificar si el post tiene comentarios
      if (!comments || comments.length === 0) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "No se encontraron comentarios para el post",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Comentarios del post obtenidos exitosamente",
        comments,
      });
    } catch (error) {
      handleError(res, error, "obtener los comentarios del post");
    }
  }

  async createComment(req, res) {
    try {
      const { titulo_post, contenido } = req.body;

      const nombre_usuario = req.user?.nombre_usuario;
      if (!nombre_usuario) {
        return res.status(401).json({
          success: false,
          status: 401,
          message: "No se pudo identificar al usuario autenticado",
        });
      }

      // Validaciones básicas
      if (!titulo_post || !contenido) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Todos los campos son obligatorios",
        });
      }

      // Llamar al proceso
      const newComment = await this.CommentProcess.createComment({
        titulo_post,
        nombre_usuario,
        contenido,
      });

      // Enviar respuesta
      res.status(201).json({
        success: true,
        status: 201,
        message: "Comentario creado exitosamente",
        newComment,
      });
    } catch (error) {
      console.error("Error al crear el comentario:", error);
      res.status(500).json({
        success: false,
        status: 500,
        message: "Error interno del servidor al crear el comentario",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async updateComment(req, res) {
    try {
      const { id } = req.params;
      const commentData = req.body;

      // Obtener el comentario para verificar el propietario
      const existingComment = await this.CommentProcess.findCommentById(id);
      if (!existingComment) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "Comentario no encontrado",
        });
      }

      // Verificar si el usuario es el propietario del comentario o es admin/editor
      if (!isOwnerOrAdmin(req, id)) {
        return res.status(403).json({
          success: false,
          status: 403,
          message:
            "No tienes permiso para actualizar este comentario. Solo el autor puede hacerlo",
        });
      }

      // Validar que al menos venga un campo para actualizar
      if (!commentData || Object.keys(commentData).length === 0) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Debes enviar al menos un campo para actualizar",
        });
      }

      // Llamar al proceso
      const updatedComment = await this.CommentProcess.updateComment(
        id,
        commentData
      );

      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Comentario actualizado exitosamente",
        updatedComment,
      });
    } catch (error) {
      handleError(res, error, "actualizar el comentario");
    }
  }

  async deleteComment(req, res) {
    try {
      const { id } = req.params;

      // Obtener el comentario para verificar el propietario
      const existingComment = await this.CommentProcess.findCommentById(id);
      if (!existingComment) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "Comentario no encontrado",
        });
      }

      // Solo el propietario, admin o editor pueden eliminar
      if (!isOwnerOrAdmin(req, id)) {
        return res.status(403).json({
          success: false,
          status: 403,
          message:
            "No tienes permiso para eliminar este comentario. Solo el autor puede hacerlo",
        });
      }

      // Eliminar el comantario
      await this.CommentProcess.deleteComment(id);

      res.status(200).json({
        success: true,
        status: 200,
        message: "Comentario eliminado exitosamente",
      });
    } catch (error) {
      handleError(res, error, "eliminar el comentario");
    }
  }
}

module.exports = CommentController;
