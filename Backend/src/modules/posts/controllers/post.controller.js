const PostProcess = require("@/modules/posts/processes/post.process");

class PostController {
  constructor() {
    this.PostProcess = new PostProcess();
  }

  async findAllPosts(req, res) {
    try {
      // Parámetros de paginación
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Validar que los valores de paginación son positivos
      if (page < 1 || limit < 1) {
        return res.status.json({
          success: false,
          message: "Los valores de page y limit deben ser números positivos",
        });
      }

      // Limitar el máximo de elementos por página
      const maxLimit = 100;
      const finalLimit = limit > maxLimit ? maxLimit : limit;

      // Llamar al proceso
      const result = await this.PostProcess.findAllPosts(page, finalLimit);

      // Validar si se encontraron posts
      if (!result.posts || result.posts.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No se encontraron post en esta página",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        message: "Post obtenidos exitosamente",
        posts: result.posts,
        pagination: {
          currentPage: page,
          totalPages: result.totalPages,
          totalPosts: result.totalPosts,
          postsPerPage: finalLimit,
          hasNextPage: page < result.totalPages,
          hasPreviousPage: page > 1,
        },
      });
    } catch (error) {
      console.error("Error al obtener todos los posts:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al obtener los posts",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
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
          success: false,
          message: "Post no encontrado",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        message: "Post obtenido exitosamente",
        post,
      });
    } catch (error) {
      console.error("Error al obtener el post:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al obtener el post",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
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
          message: "No se encontraron posts del usuario",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        message: "Posts del usuario obtenidos exitosamente",
        posts,
      });
    } catch (error) {
      console.error("Error al obtener los posts del usuario:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al obtener los posts del usuario",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
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
          message: "No se encontraron posts de la categoría",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        message: "Posts de la categoría obtenidos exitosamente",
        posts,
      });
    } catch (error) {
      console.error("Error al obtener los posts de la categoría:", error);
      res.status(500).json({
        success: false,
        message:
          "Error interno del servidor al obtener los posts de la categoría",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async searchPosts(req, res) {
    try {
      const { term } = req.query;

      // Validar que el término de búsqueda no esté vacío
      if (!term || term.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "El término de búsqueda no puede estar vacío",
        });
      }

      // Llamar al proceso
      const posts = await this.PostProcess.search(term);

      // Verificar si se encontraron posts
      if (!posts || posts.length === 0) {
        return res.status(404).json({
          success: false,
          message:
            "No se encontraron posts que coincidan con el término de búsqueda",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        message: "Posts obtenidos exitosamente",
        posts,
      });
    } catch (error) {
      console.error("Error al buscar posts:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al buscar posts",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async createPost(req, res) {
    try {
      const {
        nombre_usuario,
        nombre_categoria,
        titulo,
        contenido,
        url_imagen,
      } = req.body;

      //Validaciones básicas
      if (
        !nombre_usuario ||
        !nombre_categoria ||
        !titulo ||
        !contenido ||
        !url_imagen
      ) {
        res.status(400).json({
          success: false,
          message: "Todos los campos son obligatorios",
        });
      }

      // Llamar al proceso
      const newPost = await this.PostProcess.createPost({
        nombre_usuario,
        nombre_categoria,
        titulo,
        contenido,
        url_imagen,
      });

      // Enviar respuesta
      res.status(201).json({
        success: true,
        message: "Post creado exitosamente",
        newPost,
      });
    } catch (error) {
      console.error("Error al crear el post:", error);
      res.status(500).json({
        success: false,
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

      // Validar que al menos venga un campo para actualizar
      if (!postData || Object.keys(postData).length === 0) {
        return res.status(400).json({
          success: false,
          message: "Debes enviar al menos un campo para actualizar",
        });
      }

      // Llamar al proceso
      const updatedPost = await this.PostProcess.updatePost(id, postData);

      // Verificar si el post existe
      if (!updatedPost) {
        return res.status(404).json({
          success: false,
          message: "Post no encontrado",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        message: "Post actualizado exitosamente",
        updatedPost,
      });
    } catch (error) {
      console.error("Error al actualizar el post:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al actualizar el post",
        error:
          process.abort.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  async deletePost(req, res) {
    try {
      const { id } = req.params;

      //Llamar al proceso
      const deletedPost = await this.PostProcess.deletePost(id);

      // Verificar si el post existe
      if (!deletedPost) {
        return res.status(404).json({
          success: false,
          message: "Post no encontrado",
        });
      }

      // Enviar respuesta
      res.status(200).json({
        success: true,
        message: "Post eliminado exitosamente",
      });
    } catch (error) {
      console.error("Error el eliminar el post:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor al eliminar el post",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

module.exports = PostController;
