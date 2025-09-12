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
    const { titulo_post, nombre_usuario } = commentData;

    // Buscar post por titulo
    const post = await Post.findOne({
      where: { titulo: titulo_post },
    });
    if (!post) {
      throw new Error("El post existe");
    }

    // Buscar el usuario por nombre_usuario
    const user = await User.findOne({
      where: { nombre_usuario },
    });
    if (!user) {
      throw new Error("El usuario no existe");
    }

    // Verificar si el comentario existe
    const existingComment = await Comment.findOne({
      where: { contenido: commentData.contenido },
    });
    if (existingComment) {
      throw new Error("El comentario ya existe");
    }

    // Crear el comentario con los IDs obtenidos
    const newComment = await Comment.create({
      ...commentData,
      id_post: post.id,
      id_usuario: user.id,
    });
    return newComment;
  }

  async update(id, commentData) {
    const { titulo_post, nombre_usuario, ...updateData } = commentData;

    // Buscar post por titulo
    if (titulo_post) {
      const post = await Post.findOne({
        where: { titulo: titulo_post },
      });
      if (!post) {
        throw new Error("El post no existe");
      }
      updateData.id_post = post.id;
    }

    // Buscar el usuario por nombre_usuario
    if (nombre_usuario) {
      const user = await User.findOne({
        where: { nombre_usuario },
      });
      if (!user) {
        throw new Error("El usuario no existe");
      }
      updateData.id_usuario = user.id;
    }

    // Aztualizar el campo de fecha_actualizacion
    updateData.fecha_actualizacion = new Date();

    // Bucar el comentario por id
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new Error("Comentario no enconrado");
    }

    // Actualizar el comentario
    return await comment.update(updateData);
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
