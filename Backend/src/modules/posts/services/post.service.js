const RepositoryConfig = require("@/shared/config/repository");
const PostBuilder = require("@/modules/posts/builders/post.builder");

class PostService {
  constructor() {
    this.PostRepository = RepositoryConfig.getRepository("postRepository");
    this.UserRepository = RepositoryConfig.getRepository("userRepository");
    this.CategoryRepository =
      RepositoryConfig.getRepository("categoryRepository");
  }

  async findAllPosts(page = 1, limit = 10) {
    return await this.PostRepository.findAll(page, limit);
  }

  async findPostById(id) {
    const post = await this.PostRepository.findById(id);
    if (!post) throw new Error("Post no encontrado");
    return post;
  }

  async findPostByTitle(titulo) {
    const post = await this.PostRepository.findByTitle(titulo);
    if (!post) throw new Error("Post no encontrado");
    return post;
  }

  async findPostsByUser(id_usuario) {
    const posts = await this.PostRepository.findByUser(id_usuario);
    if (!posts || posts.length === 0)
      throw new Error("Posts del usuario no encontrados");
    return posts;
  }

  async findPostsByCategory(id_categoria) {
    const posts = await this.PostRepository.findByCategory(id_categoria);
    if (!posts || posts.length === 0)
      throw new Error("Posts de la categoría no encontrados");
    return posts;
  }

  async search(query) {
    const posts = await this.PostRepository.search(query);
    if (!posts || posts.length === 0)
      throw new Error("No se encontraron posts");
    return posts;
  }

  async createPost(postData) {
    const {
      id_usuario,
      nombre_usuario,
      nombre_categoria,
      titulo,
      contenido,
      url_imagen,
    } = postData;

    // Validar usuario
    const user = await this.UserRepository.findById(id_usuario);
    if (!user) throw new Error("El usuario no existe");

    // Validar categoría
    const category = await this.CategoryRepository.findByName(nombre_categoria);
    if (!category) throw new Error("La categoría no existe");

    // Validar título único
    const existingPost = await this.PostRepository.search(titulo);
    if (existingPost && existingPost.length > 0)
      throw new Error("El post ya existe");

    // Construir el post
    const builder = new PostBuilder()
      .setNombreUsuario(nombre_usuario)
      .setNombreCategoria(nombre_categoria)
      .setTitulo(titulo)
      .setContenido(contenido)
      .setUrlImagen(url_imagen);

    const postToCreate = {
      ...builder.build(),
      id_usuario: user.id,
      id_categoria: category.id,
    };

    return await this.PostRepository.create(postToCreate);
  }

  async updatePost(id, postData) {
    const {
      nombre_usuario,
      nombre_categoria,
      titulo,
      contenido,
      url_imagen,
      fecha_actualizacion,
      estado,
    } = postData;

    const updateData = {};

    // Validar usuario
    if (nombre_usuario) {
      const user = await this.UserRepository.findByUsername(nombre_usuario);
      if (!user) throw new Error("El usuario no existe");
      updateData.id_usuario = user.id;
    }

    // Validar categoría
    if (nombre_categoria) {
      const category = await this.CategoryRepository.findByName(
        nombre_categoria
      );
      if (!category) throw new Error("La categoría no existe");
      updateData.id_categoria = category.id;
    }

    // Builder para el resto de campos
    const builder = new PostBuilder()
      .setTitulo(titulo)
      .setContenido(contenido)
      .setUrlImagen(url_imagen)
      .setFechaActualizacion(fecha_actualizacion || new Date())
      .setEstado(estado);

    Object.assign(updateData, builder.build());

    const updatedPost = await this.PostRepository.update(id, updateData);
    if (!updatedPost) throw new Error("Post no encontrado");

    return updatedPost;
  }

  async deletePost(id) {
    const deletedPost = await this.PostRepository.delete(id);
    if (!deletedPost) throw new Error("Post no encontrado");
    return deletedPost;
  }
}

module.exports = PostService;
