class PostBuilder {
  constructor() {
    this.post = {};
  }

  setIdUsuario(id_usuario) {
    this.post.id_usuario = id_usuario;
    return this;
  }

  setIdCategoria(id_categoria) {
    this.post.id_categoria = id_categoria;
    return this;
  }

  setTitulo(titulo) {
    this.post.titulo = titulo;
    return this;
  }

  setContenido(contenido) {
    this.post.contenido = contenido;
    return this;
  }

  setFechaPublicacion(fecha_publicacion) {
    this.post.fecha_publicacion = fecha_publicacion;
    return this;
  }

  setFechaActualizacion(fecha_actualizacion) {
    this.post.fecha_actualizacion = fecha_actualizacion;
    return this;
  }

  setUrlImagen(url_imagen) {
    this.post.url_imagen = url_imagen;
    return this;
  }

  setEstado(estado) {
    this.post.estado = estado;
    return this;
  }

  build() {
    return this.post;
  }
}

module.exports = PostBuilder;
