-- Creación de DB
CREATE DATABASE star_wiki;
\c star_wiki;

-- Tabla Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL, 
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255) DEFAULT 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025_f2.png', 
    biografia TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rol VARCHAR(20) DEFAULT 'USER' CHECK (rol IN ('ADMIN', 'EDITOR', 'USER')),
    estado BOOLEAN DEFAULT true,
    verificado BOOLEAN DEFAULT false,
    codigo_verificacion VARCHAR(6),
    expiracion_codigo TIMESTAMP
);

-- Índices
CREATE INDEX idx_email ON usuarios(email);
CREATE INDEX idx_rol ON usuarios(rol);

-- Tabla Categorías
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Posts
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_categoria INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    url_imagen VARCHAR(255) NOT NULL,
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'BORRADOR' CHECK (estado IN ('BORRADOR', 'PUBLICADO', 'ARCHIVADO')),
    
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);

-- Índices
CREATE INDEX idx_usuario ON posts(id_usuario);
CREATE INDEX idx_categoria ON posts(id_categoria);
CREATE INDEX idx_fecha ON posts(fecha_publicacion);
CREATE INDEX idx_estado ON posts(estado);

-- Tabla Comentarios
CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    id_post INT NOT NULL,
    id_usuario INT NOT NULL,
    contenido TEXT NOT NULL,
    fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN DEFAULT true,
    
    FOREIGN KEY (id_post) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Índices
CREATE INDEX idx_post ON comentarios(id_post);
CREATE INDEX idx_usuario_comentario ON comentarios(id_usuario);
CREATE INDEX idx_fecha_comentario ON comentarios(fecha_comentario);
