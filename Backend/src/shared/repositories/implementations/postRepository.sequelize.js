const IPostRepository = require("../../repositories/interfaces/postRepository.interface");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Category = require("../../models/Category");
const { Op } = require("sequelize");

class PostRepository extends IPostRepository {
  async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Post.findAndCountAll({
      offset,
      limit,
      attributes: [
        "id",
        "titulo",
        "contenido",
        "url_imagen",
        "fecha_publicacion",
        "fecha_actualizacion",
        "estado",
      ],
      include: [
        {
          model: User,
          attributes: [
            "id",
            "nombre",
            "apellido",
            "nombre_usuario",
            "email",
            "fecha_registro",
          ],
        },
        {
          model: Category,
          attributes: ["id", "nombre", "descripcion", "fecha_creacion"],
        },
      ],
      order: [["id", "ASC"]],
    });

    return {
      posts: rows,
      totalPost: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  async findById(id) {
    return await Post.findByPk(id, {
      attributes: [
        "id",
        "titulo",
        "contenido",
        "url_imagen",
        "fecha_publicacion",
        "fecha_actualizacion",
        "estado",
      ],
      include: [
        {
          model: User,
          attributes: [
            "id",
            "nombre",
            "apellido",
            "nombre_usuario",
            "email",
            "fecha_registro",
          ],
        },
        {
          model: Category,
          attributes: ["id", "nombre", "descripcion", "fecha_creacion"],
        },
      ],
    });
  }

  async findByTitle(titulo) {
    return await Post.findOne({
      where: { titulo: { [Op.iLike]: `%${titulo}%` } },
    });
  }

  async findByUser(id_usuario) {
    return await Post.findAll({ where: { id_usuario } });
  }

  async findByCategory(id_categoria) {
    return await Post.findAll({ where: { id_categoria } });
  }

  async search(query) {
    return await Post.findAll({
      where: { titulo: { [Op.iLike]: `%${query}%` } },
    });
  }

  async create(postData) {
    return await Post.create(postData);
  }

  async update(id, updateData) {
    const post = await Post.findByPk(id);
    if (!post) return null;
    return await post.update(updateData);
  }

  async delete(id) {
    const post = await Post.findByPk(id);
    if (!post) return null;
    await post.destroy();
    return post;
  }
}

module.exports = PostRepository;
