const RepositoryConfig = require("@/shared/config/repository");
const PostBuilder = require("@/modules/posts/builders/post.builder");

class PostService {
  constructor() {
    this.PostRepository = RepositoryConfig.getRepository("post");
    this.UserRepository = RepositoryConfig.getRepository("user");
  }

  async findAllPosts(page = 1, limit = 10) {
    try {
      return await this.PostRepository.findAll(page, limit);
    } catch (error) {
      console.error("Error al obtener todos los posts");
      throw error;
    }
  }

  async findPostById(id) {
    try {
      return await this.PostRepository.findById(id);
    } catch (error) {
      console.error("Error al obtener el post");
      throw error;
    }
  }

  async findPostsByUser(id_usuario) {
    try {
      return await this.PostRepository.findByUser(id_usuario);
    } catch (error) {
      console.error("Error al obtener los posts del usuario");
      throw error;
    }
  }

  async findPostsByCategory(id_categoria) {
    try {
      return await this.PostRepository.findByCategory(id_categoria);
    } catch (error) {
      console.error("Error al obtener los post de la categoría");
      throw error;
    }
  }

  async search(query) {
    try {
      return await this.PostRepository.search(query);
    } catch (error) {
      console.error("Error al buscar posts");
      throw error;
    }
  }

  async createPost(postData) {
    try {
      const { id_usuario, id_categoria, titulo, contenido, url_imagen } =
        postData;

      // Aplicamos el builder
      const builder = new PostBuilder()
        .setIdUsuario(id_usuario)
        .setIdCategoria(id_categoria)
        .setTitulo(titulo)
        .setContenido(contenido)
        .setUrlImagen(url_imagen);

      const postToCreate = builder.build();

      // Creamos el post
      return await this.PostRepository.create(postToCreate);
    } catch (error) {
      console.error("Error al crear el post");
      throw error;
    }
  }

  async updatePost(id, postData) {
    try {
      const {
        id_categoria,
        titulo,
        contenido,
        url_imagen,
        fecha_actualizacion,
        estado,
      } = postData;

      // Aplicamos el builder
      const builder = new PostBuilder()
        .setIdCategoria(id_categoria)
        .setTitulo(titulo)
        .setContenido(contenido)
        .setUrlImagen(url_imagen)
        .setFechaActualizacion(fecha_actualizacion)
        .setEstado(estado);

      const postToUpdate = builder.build();

      // Actualizamos el post
      return await this.PostRepository.update(id, postToUpdate);
    } catch (error) {
      console.error("Error al actualizar el post");
      throw error;
    }
  }

  async deletPost(id) {
    try {
      return await this.PostRepository.delete(id);
    } catch (error) {
      console.error("Error al eliminar el post");
      throw error;
    }
  }
}

module.exports = PostService;
