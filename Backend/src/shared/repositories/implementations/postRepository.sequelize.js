const IPostRepository = require("@/shared/repositories/interfaces/postRepository.interface");
const Post = require("@/shared/models/Post");
const User = require("@/shared/models/User");
const Category = require("@/shared/models/Category");
const { Op } = require("sequelize");

class PostRepository extends IPostRepository {
  // MÉTODO PARA OBTENER TODOS LOS POSTS
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

  // MÉTODO PARA OBTENER UN POST POR SU ID
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

  // MÉTODO PARA OBTENER TODOS LOS POSTS DE UN USUARIO
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

  // MÉTODO PARA OBTENER TODOS LOS POSTS DE UNA CATEGORÍA
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

  // MÉTODO PARA BUSCAR POSTS POR TÍTULO
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
  //! Que el nombre_usuario se cree en automatico con la sesion que este iniciada

  // MÉTODO PARA CREAR UN POST
  async create(postData) {
    const { nombre_usuario, nombre_categoria } = postData;

    // Buscar el usuario por nombre_usuario
    const user = await User.findOne({
      where: { nombre_usuario },
    });
    if (!user) {
      throw new Error("El usuario no existe");
    }

    // Buscar la categoria por nombre
    const category = await Category.findOne({
      where: { nombre: nombre_categoria },
    });
    if (!category) {
      throw new Error("La categoria no existe");
    }

    // Verificar si el post existe con el mismo titulo
    const existingPost = await Post.findOne({
      where: { titulo: postData.titulo },
    });
    if (existingPost) {
      throw new Error("El post ya existe");
    }

    // Crear el post con los IDs obtenidos
    const newPost = await Post.create({
      ...postData,
      id_usuario: user.id,
      id_categoria: category.id,
    });
    return newPost;
  }

  // MÉTODO PARA ACTUALIZAR UN POST
  async update(id, postData) {
    const { nombre_categoria, ...updateData } = postData;

    // Buscar la categoria por nombre
    if (nombre_categoria) {
      const category = await Category.findOne({
        where: { nombre: nombre_categoria },
      });
      if (!category) {
        throw new Error("La categoria no existe");
      }
      updateData.id_categoria = category.id;
    }

    // Aztualizar el campo de fecha_actualizacion
    updateData.fecha_actualizacion = new Date();

    // Buscar el post por id
    const post = await Post.findByPk(id);
    if (!post) {
      throw new Error("Post no encontrado");
    }

    // Actualizar el post
    return await post.update(updateData);
  }

  // MÉTODO PARA ELIMINAR UN POST
  async delete(id) {
    const post = await Post.findByPk(id);
    if (!post) {
      throw new Error("Post no encontrado");
    }
    return await post.destroy();
  }
}

module.exports = PostRepository;
