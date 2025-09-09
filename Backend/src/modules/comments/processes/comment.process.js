const CommentService = require("@/modules/comments/services/comment.service");

class CommentProcess {
  constructor() {
    this.CommentService = new CommentService();
  }

  async findAllComments(page, limit) {
    try {
      return await this.CommentService.findAllComments(page, limit);
    } catch (error) {
      console.error("Error al obtener todos los comentarios (process)");
      throw error;
    }
  }

  async findCommentById(id) {
    try {
      return await this.CommentService.findCommentById(id);
    } catch (error) {
      console.error("Error al obtener el comentario (process)");
      throw error;
    }
  }

  async findCommentsByPost(id_post) {
    try {
      return await this.CommentService.findCommentsByPost(id_post);
    } catch (error) {
      console.error("Error al obtener los comentarios del post (process)");
      throw error;
    }
  }

  async createComment(commentData) {
    try {
      return await this.CommentService.createComment(commentData);
    } catch (error) {
      console.error("Error al crear el comentario (process)");
      throw error;
    }
  }

  async updateComment(id, commentData) {
    try {
      return await this.CommentService.updateComment(id, commentData);
    } catch (error) {
      console.error("Error al actualizar el comentario (process)");
      throw error;
    }
  }

  async deleteComment(id) {
    try {
      return await this.CommentService.deleteComment(id);
    } catch (error) {
      console.error("Error al eliminar el comentario (process)");
      throw error;
    }
  }
}

module.exports = CommentProcess;
