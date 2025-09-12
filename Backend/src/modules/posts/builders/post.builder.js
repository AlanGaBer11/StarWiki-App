class PostBuilder {
  constructor() {
    this.post = {};
  }

  setNomreUsuario(nombre_usuario) {
    this.post.nombre_usuario = nombre_usuario;
    return this;
  }

  setNombreCategoria(nombre_categoria) {
    this.post.nombre_categoria = nombre_categoria;
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
