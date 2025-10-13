# Dependencias

- `npm express` - Framework web para Node.js (GET, POST, DELETE, PUT, PATCH)
- `npm cors` - Permite solicitudes desde distintos dispositivos
- `npm nodemon -D` - Recarga automáticamente el servidor en desarrollo
- `npm sequelize` - ORM para conexión a base de datos
- `npm pg pg-hstore` - Driver de PostgreSQL para Sequelize y manejo de tipos de datos HSTORE
- `npm body-parser` - Convierte datos a JSON
- `npm dotenv --save` - Manejo de variables de entorno
- `npm bcryptjs` - Encriptación de contraseñas
- `npm jsonwebtoken` - Generación de tokens JWT
- `npm express-validator` - Validaciones de datos
- `npm express-rate-limit` - Limita el número de peticiones a la API
- `npm helmet` - Protege la APP de vulnerabilidades de XSS
- `npm standard -D` - Asegura la consistencia y calidad del código (linting)
- `npm install module-alias --save` - Alias para importar archivos
- `npm nodemailer` - Enviar correos electrónicos
- `npm multer` - Subida de archivos (imágenes, documentos)
- `npm sharp` - Optimización de imágenes (redimensionar, comprimir, convertir formatos)
- `npm jest` - Para realizar pruebas unitarias
- `npm supertest` - Para realizar pruebas de integración

# Endpoints

## Autenticación

| Método | Endpoint                              | Descripción                  |
| ------ | ------------------------------------- | ---------------------------- |
| POST   | `/api/v2/auth/register`               | Registra un usuario          |
| POST   | `/api/v2/auth/login`                  | Logea un usuario             |
| POST   | `/api/v2/auth/send-verification-code` | Envía código de verificación |
| POST   | `/api/v2/auth/verify-account`         | Verifica cuenta              |
| POST   | `/api/v2/auth/reset-password`         | Recuperar contraseña         |

## Usuarios

| Método | Endpoint                           | Descripción                |
| ------ | ---------------------------------- | -------------------------- |
| GET    | `/api/v2/users/getUsers`           | Obtiene todos los usuarios |
| GET    | `/api/v2/users/getUserById/:id`    | Obtiene un usuario por ID  |
| POST   | `/api/v2/users/createUser`         | Crea un usuario            |
| PATCH  | `/api/v2/users/updateUser/:id`     | Actualiza un usuario       |
| DELETE | `/api/v2/users/deleteUser/:id`     | Elimina un usuario         |
| PATCH  | `/api/v2/users/deactivateUser/:id` | Desactiva un usuario       |
| PATCH  | `/api/v2/users/reactivateUser/:id` | Reactiva un usuario        |

## Categorías

| Método | Endpoint                                       | Descripción                         |
| ------ | ---------------------------------------------- | ----------------------------------- |
| GET    | `/api/v2/categories/getCategories`             | Obtiene todas las categorías        |
| GET    | `/api/v2/categories/getCategoryById/:id`       | Obtiene una categoría por ID        |
| GET    | `/api/v2/categories/getCategoryByName/:nombre` | Obtiene una categoría por su nombre |
| POST   | `/api/v2/categories/createCategory`            | Crea una categoría                  |
| PATCH  | `/api/v2/categories/updateCategory/:id`        | Actualiza una categoría             |
| DELETE | `/api/v2/categories/deleteCategory/:id`        | Elimina una categoría               |

## Posts

| Método | Endpoint                               | Descripción                |
| ------ | -------------------------------------- | -------------------------- |
| GET    | `/api/v2/posts/getPosts`               | Obtiene todos los posts    |
| GET    | `/api/v2/posts/getPostById/:id`        | Obtiene un post por ID     |
| GET    | `/api/v2/posts/user/:id_usuario `      | Posts por usuario          |
| GET    | `/api/v2/posts/getPostByTitle/:titulo` | Obtiene un post por título |
| GET    | `/api/v2/posts/category/:id_categoria` | Posts por categoría        |
| GET    | `/api/v2/posts/search`                 | Búsqueda de posts          |
| POST   | `/api/v2/posts/createPost`             | Crea un post               |
| PATCH  | `/api/v2/posts/updatePost/:id`         | Actualiza un post          |
| DELETE | `/api/v2/posts/deletePost/:id`         | Elimina un post            |

## Comentarios

| Método | Endpoint                              | Descripción                       |
| ------ | ------------------------------------- | --------------------------------- |
| GET    | `/api/v2/comments/getComments`        | Obtiene todos los comentarios     |
| GET    | `/api/v2/comments/getCommentById/:id` | Obtiene un comentario por ID      |
| GET    | `/api/v2/comments/post/:id  `         | Comentarios de un post específico |
| POST   | `/api/v2/comments/createComment`      | Crea un comentario                |
| PATCH  | `/api/v2/comments/updateComment/:id`  | Actualiza un comentario           |
| DELETE | `/api/v2/comments/deleteComment/:id`  | Elimina un comentario             |

# Seguridad

- Se usa **bcryptjs** para encriptar contraseñas.
- Se usa **JWT (jsonwebtoken)** para autenticar usuarios.
- Se usa **helmet** para proteger la app de ataques XSS.
- Se usa **express-rate-limit** para limitar el número de peticiones a la API.
