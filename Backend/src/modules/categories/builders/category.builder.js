class CategoryBuilder {
  constructor() {
    this.category = {};
  }
  setNombre(nombre) {
    this.category.nombre = nombre;
    return this;
  }

  setDescripcion(descripcion) {
    this.category.descripcion = descripcion;
    return this;
  }

  setFechaCreacion(fecha_creacion) {
    this.category.fecha_creacion = fecha_creacion;
    return this;
  }

  setFechaActualizacion(fecha_actualizacion) {
    this.category.fecha_actualizacion = fecha_actualizacion;
    return this;
  }

  build() {
    return this.category;
  }
}

module.exports = CategoryBuilder;
