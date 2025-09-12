const RepositoryConfig = require("@/shared/config/repository");
const CommentBuilder = require("@/modules/comments/builders/comment.build");

class CommentService {
  constructor() {
    this.CommentRepository = RepositoryConfig.getRepository("comment");
  }

  async findAllComments(page = 1, limit = 10) {
    try {
      return await this.CommentRepository.findAll(page, limit);
    } catch (error) {
      console.error("Error al obtener todos los comentarios (service)");
      throw error;
    }
  }

  async findCommentById(id) {
    try {
      return await this.CommentRepository.findById(id);
    } catch (error) {
      console.error("Error al obtener el comentario (service)");
      throw error;
    }
  }

  async findCommentsByPost(id_post) {
    try {
      return await this.CommentRepository.findCommentsByPost(id_post);
    } catch (error) {
      console.error("Error al obtener los comentarios del post (service)");
      throw error;
    }
  }

  async createComment(commentData) {
    try {
      const { titulo_post, nombre_usuario, contenido } = commentData;

      // Aplicamos el builder
      const builder = new CommentBuilder()
        .setTituloPost(titulo_post)
        .setNombreUsuario(nombre_usuario)
        .setContenido(contenido);

      const commentToCreate = builder.build();

      // Creamos el comentario
      return await this.CommentRepository.create(commentToCreate);
    } catch (error) {
      console.error("Error al crear el Post (service)");
      throw error;
    }
  }

  async updateComment(id, commentData) {
    try {
      const { titulo_post, nombre_usuario, contenido, fecha_actualizacion } =
        commentData;

      // Aplicamos el builder
      const builder = new CommentBuilder()
        .setTituloPost(titulo_post)
        .setNombreUsuario(nombre_usuario)
        .setContenido(contenido)
        .setFechaActualizacion(fecha_actualizacion);

      const commentToUpdate = builder.build();

      // Actualizamos el comentario
      return await this.CommentRepository.update(id, commentToUpdate);
    } catch (error) {
      console.error("Error al actualizar la categoría (service)");
      throw error;
    }
  }

  async deleteComment(id) {
    try {
      return await this.CommentRepository.delete(id);
    } catch (error) {
      console.error("Error al eliminar el comentario (service)");
      throw error;
    }
  }
}

module.exports = CommentService;
