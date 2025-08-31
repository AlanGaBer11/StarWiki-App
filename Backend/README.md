# Estructura

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

# Endpoints

## Autenticación

| Método | Endpoint                  | Descripción                  |
| ------ | ------------------------- | ---------------------------- |
| POST   | `/api/auth/register`      | Registra un usuario          |
| POST   | `/api/auth/login`         | Logea un usuario             |
| POST   | `/api/auth/sendCode`      | Envía código de verificación |
| POST   | `/api/auth/verifyAccount` | Verifica cuenta              |
| POST   | `/api/auth/resetPassword` | Recuperar contraseña         |

## Usuarios

| Método | Endpoint                    | Descripción                |
| ------ | --------------------------- | -------------------------- |
| GET    | `/api/users/getUsers`       | Obtiene todos los usuarios |
| GET    | `/api/users/getUser/:id`    | Obtiene un usuario por ID  |
| POST   | `/api/users/createUser`     | Crea un usuario            |
| PATCH  | `/api/users/updateUser/:id` | Actualiza un usuario       |
| DELETE | `/api/users/deleteUser/:id` | Elimina un usuario         |

## Categorías

| Método | Endpoint                                    | Descripción                         |
| ------ | ------------------------------------------- | ----------------------------------- |
| GET    | `/api/categories/getCategories`             | Obtiene todas las categorías        |
| GET    | `/api/categories/getCategory/:id`           | Obtiene una categoría por ID        |
| GET    | `/api/categories/getCategoryByName/:nombre` | Obtiene una categoría por su nombre |
| POST   | `/api/categories/createCategory`            | Crea una categoría                  |
| PATCH  | `/api/categories/updateCategory/:id`        | Actualiza una categoría             |
| DELETE | `/api/categories/deleteCategory/:id`        | Elimina una categoría               |

## Posts

| Método | Endpoint                    | Descripción             |
| ------ | --------------------------- | ----------------------- |
| GET    | `/api/posts/getPosts`       | Obtiene todos los posts |
| GET    | `/api/posts/getPost/:id`    | Obtiene un post por ID  |
| GET    | `/api/posts/category/:id `  | Posts por categoría     |
| GET    | `/api/posts/user/:id `      | Posts por usuario       |
| GET    | `/api/posts/search?q=term`  | Búsqueda de posts       |
| POST   | `/api/posts/createPost`     | Crea un post            |
| PATCH  | `/api/posts/updatePost/:id` | Actualiza un post       |
| DELETE | `/api/posts/deletePost/:id` | Elimina un post         |

## Comentarios

| Método | Endpoint                          | Descripción                       |
| ------ | --------------------------------- | --------------------------------- |
| GET    | `/api/comments/getComments`       | Obtiene todos los comentarios     |
| GET    | `/api/comments/getComment/:id`    | Obtiene un comentario por ID      |
| GET    | `/api/comments/post/:id  `        | Comentarios de un post específico |
| POST   | `/api/comments/createComment`     | Crea un comentario                |
| PATCH  | `/api/comments/updateComment/:id` | Actualiza un comentario           |
| DELETE | `/api/comments/deleteComment/:id` | Elimina un comentario             |

# Seguridad

- Se usa **bcryptjs** para encriptar contraseñas.
- Se usa **JWT (jsonwebtoken)** para autenticar usuarios.
- Se usa **helmet** para proteger la app de ataques XSS.
- Se usa **express-rate-limit** para limitar el número de peticiones a la API.
