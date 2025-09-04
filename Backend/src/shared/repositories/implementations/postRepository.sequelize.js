const IPostRepository = require("@/shared/repositories/interfaces/postRepository.interface");
const Post = require("@/shared/models/Post");
const User = require("@/shared/models/User");
const Category = require("@/shared/models/Category");
const { Op } = require("sequelize");

class PostRepository extends IPostRepository {
  async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Post.findAndCountAll({
      offset: offset,
      limit: limit,
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
      toalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  async findById(id) {
    const post = await Post.findByPk(id, {
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

    if (!post) {
      throw new Error("Post no encontrado");
    }
    return post;
  }

  async findByUser(id_usuario) {
    const post = await Post.findAll({
      where: {
        id_usuario: id_usuario,
      },
    });
    if (!post) {
      throw new Error("Posts del usuario no encontrados");
    }
    return post;
  }

  async findByCategory(id_categoria) {
    const post = await Post.findAll({
      where: {
        id_categoria: id_categoria,
      },
    });
    if (!post) {
      throw new Error("Posts de la categoría no encontrados");
    }
    return post;
  }

  async search(query) {
    const post = await Post.findAll({
      where: {
        titulo: {
          [Op.iLike]: `%${query}%`,
        },
      },
    });
    if (!post) {
      throw new Error("Posts no encontrados");
    }
    return post;
  }

  //! Métodos que requieren inicio de sesión
  //! Que el id_usuario se cree en automatico con la sesion que este iniciada
  async create(postData) {
    const existingPost = await Post.findOne({
      where: { titulo: postData.titulo },
    });
    if (existingPost) {
      throw new Error("El post ya existe");
    }
    return await Post.create(postData);
  }

  async update(id, postData) {
    const post = await Post.findByPk(id);
    if (!post) {
      throw new Error("Post no encontrado");
    }
    return await post.update(postData);
  }

  async delete(id) {
    const post = await Post.findByPk(id);
    if (!post) {
      throw new Error("Post no encontrado");
    }
    return await post.destroy();
  }
}

module.exports = PostRepository;
