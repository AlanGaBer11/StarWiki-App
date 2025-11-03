const PostProcess = require("@/modules/posts/processes/post.process");
const {
  handleError,
  validatePagination,
  isOwnerOrAdmin,
} = require("@/shared/utils/controller.utils");

class PostController {
  constructor() {
    this.PostProcess = new PostProcess();
  }

  async findAllPosts(req, res) {
    try {
      const { page, limit } = validatePagination(req.query);

      // Llamar al proceso
      const result = await this.PostProcess.findAllPosts(page, limit);

      // Validar si se encontraron posts
      if (!result.posts || result.posts.length === 0) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "No se encontraron post en esta página",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Post obtenidos exitosamente",
        pagination: {
          currentPage: page,
          totalPages: result.totalPages,
          totalPosts: result.totalPosts,
          postsPerPage: limit,
          hasNextPage: page < result.totalPages,
          hasPreviousPage: page > 1,
        },
        posts: result.posts,
      });
    } catch (error) {
      handleError(res, error, "obtener todos los posts");
    }
  }

  async findPostById(req, res) {
    try {
      const { id } = req.params;

      // Llamar al proceso
      const post = await this.PostProcess.findPostById(id);

      // Verificar si se encontraron posts
      if (!post) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "Post no encontrado",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Post obtenido exitosamente",
        post,
      });
    } catch (error) {
      handleError(res, error, "obtener el post");
    }
  }

  async findPostByTitle(req, res) {
    try {
      const { titulo } = req.params;

      // Llamar al proceso
      const post = await this.PostProcess.findPostByTitle(titulo);

      // Verificar si se encontraron posts
      if (!post) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "Post no encontrado",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Post obtenido exitosamente",
        post,
      });
    } catch (error) {
      handleError(res, error, "al obtener el post");
    }
  }

  async findPostsByUser(req, res) {
    try {
      const { id_usuario } = req.params;

      // Llamar al proceso
      const posts = await this.PostProcess.findPostByUser(id_usuario);

      // Verificar si se encontraron posts
      if (!posts || posts.length === 0) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "No se encontraron posts del usuario",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Posts del usuario obtenidos exitosamente",
        posts,
      });
    } catch (error) {
      handleError(res, error, "obtener el post");
    }
  }

  async findPostsByCategory(req, res) {
    try {
      const { id_categoria } = req.params;

      // Llamar al proceso
      const posts = await this.PostProcess.findPostByCategory(id_categoria);

      // Verificar si se encontraron posts
      if (!posts || posts.length === 0) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "No se encontraron posts de la categoría",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Posts de la categoría obtenidos exitosamente",
        posts,
      });
    } catch (error) {
      handleError(res, error, "obtener el post");
    }
  }

  async searchPosts(req, res) {
    try {
      const { term } = req.query;

      // Validar que el término de búsqueda no esté vacío
      if (!term || term.trim() === "") {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "El término de búsqueda no puede estar vacío",
        });
      }

      // Llamar al proceso
      const posts = await this.PostProcess.search(term);

      // Verificar si se encontraron posts
      if (!posts || posts.length === 0) {
        return res.status(404).json({
          success: false,
          status: 404,
          message:
            "No se encontraron posts que coincidan con el término de búsqueda",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Posts obtenidos exitosamente",
        posts,
      });
    } catch (error) {
      handleError(res, error, "buscar post");
    }
  }

  async createPost(req, res) {
    try {
      const { nombre_categoria, titulo, contenido, url_imagen } = req.body;

      const id_usuario = req.user?.id;
      const nombre_usuario = req.user?.nombre_usuario;

      if (!id_usuario || !nombre_usuario) {
        return res.status(401).json({
          success: false,
          status: 401,
          message: "No se pudo identificar al usuario autenticado",
        });
      }

      //Validaciones básicas
      if (!nombre_categoria || !titulo || !contenido || !url_imagen) {
        res.status(400).json({
          success: false,
          status: 400,
          message: "Todos los campos son obligatorios",
        });
      }

      // Llamar al proceso
      const newPost = await this.PostProcess.createPost({
        id_usuario,
        nombre_usuario,
        nombre_categoria,
        titulo,
        contenido,
        url_imagen,
      });

      // Enviar respuesta
      res.status(201).json({
        success: true,
        status: 201,
        message: "Post creado exitosamente",
        newPost,
      });
    } catch (error) {
      console.error("Error al crear el post:", error);
      res.status(500).json({
        success: false,
        status: 500,
        message: "Error interno del servidor al crear el post",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const postData = req.body;

      // Buscar el post
      const existingPost = await this.PostProcess.findPostById(id);
      if (!existingPost) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "Post no encontrado",
        });
      }

      // Verificar si el usuario esta intentando actualizar su propio post
      if (!isOwnerOrAdmin(req, id)) {
        return res.status(403).json({
          success: false,
          status: 403,
          message:
            "No tienes permiso para actualizar este post. Solo el autor puede hacerlo.",
        });
      }

      // Validar que al menos venga un campo para actualizar
      if (!postData || Object.keys(postData).length === 0) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Debes enviar al menos un campo para actualizar",
        });
      }

      const updatedPost = await this.PostProcess.updatePost(id, postData);
      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Post actualizado exitosamente",
        updatedPost,
      });
    } catch (error) {
      handleError(res, error, "actualizar post");
    }
  }

  async deletePost(req, res) {
    try {
      const { id } = req.params;

      // Buscar post
      const existingPost = await this.PostProcess.findPostById(id);
      if (!existingPost) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "Post no encontrado",
        });
      }

      // Verificar si el usuario esta intentando eliminar su propio post
      if (!isOwnerOrAdmin(req, id)) {
        return res.status(403).json({
          success: false,
          status: 403,
          message:
            "No tienes permiso para eliminar este post. Solo el autor puede hacerlo.",
        });
      }

      //Llamar al proceso
      await this.PostProcess.deletePost(id);

      // Enviar respuesta
      res.status(200).json({
        success: true,
        status: 200,
        message: "Post eliminado exitosamente",
      });
    } catch (error) {
      handleError(res, error, "eliminar el post");
    }
  }
}

module.exports = PostController;
