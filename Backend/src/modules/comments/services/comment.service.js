const RepositoryConfig = require("../../../shared/config/repository");
const CommentBuilder = require("../builders/comment.build");

class CommentService {
  constructor() {
    this.CommentRepository =
      RepositoryConfig.getRepository("commentRepository");
    this.PostRepository = RepositoryConfig.getRepository("postRepository");
    this.UserRepository = RepositoryConfig.getRepository("userRepository");
  }

  async findAllComments(page = 1, limit = 10) {
    return await this.CommentRepository.findAll(page, limit);
  }

  async findCommentById(id) {
    const comment = await this.CommentRepository.findById(id);
    if (!comment) throw new Error("Comentario no encontrado");
    return comment;
  }

  async findCommentsByPost(id_post) {
    const comments = await this.CommentRepository.findCommentsByPost(id_post);
    if (!comments || comments.length === 0)
      throw new Error("No se encontraron comentarios para este post");
    return comments;
  }

  async createComment(commentData) {
    const { titulo_post, nombre_usuario, contenido } = commentData;

    // Validar post
    const post = await this.PostRepository.findByTitle(titulo_post);
    if (!post) throw new Error("El post no existe");

    // Validar usuario
    const user = await this.UserRepository.findByUsername(nombre_usuario);
    if (!user) throw new Error("El usuario no existe");

    // Validar comentario duplicado
    const existingComment = await this.CommentRepository.create({ contenido });
    if (existingComment && existingComment.length > 0)
      throw new Error("El comentario ya existe");

    // Construir el comentario
    const builder = new CommentBuilder()
      .setTituloPost(titulo_post)
      .setNombreUsuario(nombre_usuario)
      .setContenido(contenido);

    const commentToCreate = {
      ...builder.build(),
      id_post: post.id,
      id_usuario: user.id,
    };

    return await this.CommentRepository.create(commentToCreate);
  }

  async updateComment(id, commentData) {
    const { titulo_post, nombre_usuario, contenido, fecha_actualizacion } =
      commentData;

    const updateData = {};

    if (titulo_post) {
      const post = await this.PostRepository.findByTitle(titulo_post);
      if (!post) throw new Error("El post no existe");
      updateData.id_post = post.id;
    }

    if (nombre_usuario) {
      const user = await this.UserRepository.findByUsername(nombre_usuario);
      if (!user) throw new Error("El usuario no existe");
      updateData.id_usuario = user.id;
    }

    // Builder para el resto de los campos
    const builder = new CommentBuilder()
      .setContenido(contenido)
      .setFechaActualizacion(fecha_actualizacion || new Date());

    Object.assign(updateData, builder.build());

    const updatedComment = await this.CommentRepository.update(id, updateData);
    if (!updatedComment) throw new Error("Comentario no encontrado");

    return updatedComment;
  }

  async deleteComment(id) {
    const deletedComment = await this.CommentRepository.delete(id);
    if (!deletedComment) throw new Error("Comentario no encontrado");
    return deletedComment;
  }
}

module.exports = CommentService;
