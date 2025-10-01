const ICommentRepository = require("@/shared/repositories/interfaces/commentRepository.interface");
const Comment = require("@/shared/models/Comment");
const Post = require("@/shared/models/Post");
const User = require("@/shared/models/User");

class CommentRepository extends ICommentRepository {
  async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Comment.findAndCountAll({
      offset,
      limit,
      attributes: [
        "id",
        "contenido",
        "fecha_comentario",
        "fecha_actualizacion",
        "estado",
      ],
      include: [
        { model: Post, attributes: ["id", "titulo", "url_imagen"] },
        {
          model: User,
          attributes: ["id", "nombre", "apellido", "nombre_usuario", "email"],
        },
      ],
      order: [["fecha_comentario", "DESC"]],
    });

    return {
      comments: rows,
      totalComments: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  async findById(id) {
    return await Comment.findByPk(id, {
      attributes: [
        "id",
        "contenido",
        "fecha_comentario",
        "fecha_actualizacion",
        "estado",
      ],
      include: [
        { model: Post, attributes: ["id", "titulo", "url_imagen"] },
        {
          model: User,
          attributes: ["id", "nombre", "apellido", "nombre_usuario", "email"],
        },
      ],
    });
  }

  async findCommentsByPost(id_post) {
    return await Comment.findAll({
      where: { id_post },
      include: [
        { model: Post, attributes: ["id", "titulo", "url_imagen"] },
        {
          model: User,
          attributes: ["id", "nombre", "apellido", "nombre_usuario", "email"],
        },
      ],
      order: [["fecha_comentario", "DESC"]],
    });
  }

  async create(commentData) {
    return await Comment.create(commentData);
  }

  async update(id, updateData) {
    const comment = await Comment.findByPk(id);
    if (!comment) return null;
    return await comment.update(updateData);
  }

  async delete(id) {
    const comment = await Comment.findByPk(id);
    if (!comment) return null;
    await comment.destroy();
    return comment;
  }
}

module.exports = CommentRepository;
