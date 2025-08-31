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

  build() {
    return this.category;
  }
}

module.exports = CategoryBuilder;
