class CommentBuilder {
  constructor() {
    this.comment = {};
  }

  setTituloPost(titulo_post) {
    this.comment.titulo_post = titulo_post;
    return this;
  }

  setNombreUsuario(nombre_usuario) {
    this.comment.nombre_usuario = nombre_usuario;
    return this;
  }

  setContenido(contenido) {
    this.comment.contenido = contenido;
    return this;
  }

  setFechaComentario(fecha_comentario) {
    this.comment.fecha_comentario = fecha_comentario;
    return this;
  }

  setFechaActualizacion(fecha_actualizacion) {
    this.comment.fecha_actualizacion = fecha_actualizacion;
    return this;
  }

  setEstado(estado) {
    this.comment.estado = estado;
    return this;
  }

  build() {
    return this.comment;
  }
}

module.exports = CommentBuilder;
