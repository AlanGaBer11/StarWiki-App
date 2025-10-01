const PostService = require("@/modules/posts/services/post.service");

class PostProcess {
  constructor() {
    this.PostService = new PostService();
  }

  async findAllPosts(page, limit) {
    try {
      return await this.PostService.findAllPosts(page, limit);
    } catch (error) {
      console.error("Error al obtener todos los posts");
      throw error;
    }
  }

  async findPostById(id) {
    try {
      return await this.PostService.findPostById(id);
    } catch (error) {
      console.error("Error al obtener el post");
      throw error;
    }
  }

  async findPostByTitle(titulo) {
    try {
      return await this.PostService.findPostByTitle(titulo);
    } catch (error) {
      console.error("Error al obtener el post");
      throw error;
    }
  }

  async findPostByUser(id_usuario) {
    try {
      return await this.PostService.findPostsByUser(id_usuario);
    } catch (error) {
      console.error("Error al obtener los posts del usuario");
      throw error;
    }
  }

  async findPostByCategory(id_categoria) {
    try {
      return await this.PostService.findPostsByCategory(id_categoria);
    } catch (error) {
      console.error("Error al obtener los posts de la categoría");
      throw error;
    }
  }

  async search(query) {
    try {
      return await this.PostService.search(query);
    } catch (error) {
      console.error("Error al buscar posts");
      throw error;
    }
  }

  async createPost(postData) {
    try {
      return await this.PostService.createPost(postData);
    } catch (error) {
      console.error("Error al crear el post");
      throw error;
    }
  }

  async updatePost(id, postData) {
    try {
      return await this.PostService.updatePost(id, postData);
    } catch (error) {
      console.error("Error al actualizar el post");
      throw error;
    }
  }

  async deletePost(id) {
    try {
      return await this.PostService.deletPost(id);
    } catch (error) {
      console.error("Error al eliminar el post");
      throw error;
    }
  }
}

module.exports = PostProcess;
