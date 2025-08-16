-- Tabla Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL, 
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255), -- URL del avatar
    biografia TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rol ENUM('ADMIN', 'EDITOR', 'USER') DEFAULT 'USER',
    estado BOOLEAN DEFAULT true,
    verificado BOOLEAN DEFAULT false,
    codigo_verificacion VARCHAR(6),
    expiracion_codigo TIMESTAMP,

    -- Índices para optimización
    INDEX idx_email (email),
    INDEX idx_rol (rol)
);

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
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    estado ENUM('BORRADOR', 'PUBLICADO', 'ARCHIVADO') DEFAULT 'BORRADOR',
    
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id),

    -- Índices
    INDEX idx_usuario (id_usuario),
    INDEX idx_categoria (id_categoria),
    INDEX idx_fecha (fecha_publicacion),
    INDEX idx_estado (estado)
);

-- 5. Sistema de Comentarios
CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    id_post INT NOT NULL,
    id_usuario INT NOT NULL,
    contenido TEXT NOT NULL,
    fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    estado BOOLEAN DEFAULT true,
    
    FOREIGN KEY (id_post) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,    
    -- Índices
    INDEX idx_post (id_post),
    INDEX idx_usuario (id_usuario),
    INDEX idx_fecha (fecha_comentario),
    INDEX idx_padre (id_comentario_padre)
);