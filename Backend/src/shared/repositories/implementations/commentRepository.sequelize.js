const ICommentRepository = require("@/shared/repositories/interfaces/commentRepository.interface");
const Comment = require("@/shared/models/Comment");
const Post = require("@/shared/models/Post");
const User = require("@/shared/models/User");
const { Op } = require("sequelize");

class CommentRepository extends ICommentRepository {
  async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Comment.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: [
        "id",
        "contenido",
        "fecha_comentario",
        "fecha_actualizacion",
        "estado",
      ],
      include: [
        {
          model: Post,
          attributes: ["id", "titulo", "url_imagen"],
        },
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
    const comment = await Comment.findByPk(id, {
      attributes: [
        "id",
        "contenido",
        "fecha_comentario",
        "fecha_actualizacion",
        "estado",
      ],
      include: [
        {
          model: Post,
          attributes: ["id", "titulo", "url_imagen"],
        },
        {
          model: User,
          attributes: ["id", "nombre", "apellido", "nombre_usuario", "email"],
        },
      ],
    });

    if (!comment) {
      throw new Error("Comentario no encontrado");
    }
    return comment;
  }

  async findCommentsByPost(id_post) {
    const comments = await Comment.findAll({
      where: { id_post: id_post },
      include: [
        {
          model: Post,
          attributes: ["id", "titulo", "url_imagen"],
        },
        {
          model: User,
          attributes: ["id", "nombre", "apellido", "nombre_usuario", "email"],
        },
      ],
      order: [["fecha_comentario", "DESC"]],
    });

    if (!comments || comments.length === 0) {
      throw new Error("No se encontraron comentarios para este post");
    }
    return comments;
  }

  async create(commentData) {
    const existingComment = await Comment.findOne({
      where: { contenido: commentData.contenido },
    });
    if (existingComment) {
      throw new Error("El comentario ya existe");
    }
    return await Comment.create(commentData);
  }

  async update(id, commentData) {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new Error("Comentario no enconrado");
    }
    return await comment.update(commentData);
  }

  async delete(id) {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new Error("Comentario no encontrado");
    }
    return await comment.destroy();
  }
}

module.exports = CommentRepository;
