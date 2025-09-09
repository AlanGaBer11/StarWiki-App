class CommentBuilder {
  constructor() {
    this.comment = {};
  }

  setIdPost(id_post) {
    this.comment.id_post = id_post;
    return this;
  }

  setIdUsuario(id_usuario) {
    this.comment.id_usuario = id_usuario;
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
