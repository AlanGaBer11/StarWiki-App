const CommentProcess = require("@/modules/comments/processes/comment.process");

class CommentController {
  constructor() {
    this.CommentProcess = new CommentProcess();
  }

  async findAllComments(req, res) {
    try {
      // Parámetros de paginación
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Validar que los valores de paginación son positivos
      if (page < 1 || limit < 1) {
        return res.status.json({
          success: false,
          message: "Los valores de page y limit deben ser números positivos",
        });
      }

      // Limitar el máximo de elementos por página
      const maxLimit = 100;
      const finalLimit = limit > maxLimit ? maxLimit : limit;

      // Llamar al proceso
      const result = await this.CommentProcess.findAllComments(
        page,
        finalLimit
      );

      // Validar si se encontraron comentarios
      if (!result.comments || result.comments.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No se encontraron comentarios en esta página",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        message: "Comentarios obtenidos exitosamente",
        comments: result.comments,
        pagination: {
          currentPage: page,
          totalPages: result.totalPages,
          totalComments: result.totalComments,
          commentsPerPage: finalLimit,
          hasNextPage: page < result.totalPages,
          hasPreviousPage: page > 1,
        },
      });
    } catch (error) {
      console.error("Error al obtener todos los comentarios:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al obtener los comentarios",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
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
          message: "Comentario no encontrado",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        message: "Comentario obtenido exitosamente",
        comment,
      });
    } catch (error) {
      console.error("Error al obtener el comentario:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al obtener el comentario",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
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
          message: "No se encontraron comentarios para el post",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        message: "Comentarios del post obtenidos exitosamente",
        comments,
      });
    } catch (error) {
      console.error("Error al obtener los comentarios del post:", error);
      res.status(500).json({
        success: false,
        message:
          "Error interno del servidor al obtener los comentarios del post",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async createComment(req, res) {
    try {
      const { titulo_post, nombre_usuario, contenido } = req.body;

      // Validaciones básicas
      if (!titulo_post || !nombre_usuario || !contenido) {
        return res.status(400).json({
          success: false,
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
        message: "Comentario creado exitosamente",
        newComment,
      });
    } catch (error) {
      console.error("Error al crear el comentario:", error);
      res.status(500).json({
        success: false,
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

      // Validar que al menos venga un campo para actualizar
      if (!commentData || Object.keys(commentData).length === 0) {
        return res.status(400).json({
          success: false,
          message: "Debes enviar al menos un campo para actualizar",
        });
      }

      // Llamar al proceso
      const updatedComment = await this.CommentProcess.updateComment(
        id,
        commentData
      );

      // Verificar si el comentario existe
      if (!updatedComment) {
        return res.status(404).json({
          success: false,
          message: "Comentario no encontrado",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        message: "Comentario actualizado exitosamente",
        updatedComment,
      });
    } catch (error) {
      console.error("Error al actualizar el comentario:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al actualizar el comentario",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async deleteComment(req, res) {
    try {
      const { id } = req.params;

      // Llamar al proceso
      const deletedComment = await this.CommentProcess.deleteComment(id);

      // Verificar si el comentario existe
      if (!deletedComment) {
        return res.status(404).json({
          success: false,
          message: "Comentario no encontrado",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        message: "Comentario eliminado exitosamente",
      });
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al eliminar el comentario",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

module.exports = CommentController;
