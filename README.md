# StarWiki-App

Un blog moderno y responsive construido con tecnologías web de vanguardia. StarWiki permite a los usuarios crear, leer, actualizar y eliminar contenido de blog de manera intuitiva y eficiente.

## 🚀 Características

- ✨ Interfaz de usuario moderna y responsive
- 📱 Compatible con dispositivos móviles y desktop
- 🔐 Sistema de autenticación y autorización
- 📝 Editor de contenido rico
- 🔍 Funcionalidad de búsqueda
- 💾 Almacenamiento persistente en PostgreSQL
- ⚡ API RESTful rápida y escalable

## 🏗️ Arquitectura

StarWiki utiliza una **arquitectura Cliente-Servidor** que separa claramente las responsabilidades entre el frontend y el backend:

```
┌─────────────────┐       HTTP/HTTPS       ┌─────────────────┐
│                 │ ────────────────────── │                 │
│   Frontend      │                        │    Backend      │
│ (Ionic + React) │ ←────────────────────→ │ (Node.js + API) │
│                 │      API RESTful       │                 │
└─────────────────┘                        └─────────────────┘
                                                     │
                                                     │ pg/Sequelize
                                                     ▼
                                            ┌─────────────────┐
                                            │   PostgreSQL    │
                                            │   (Database)    │
                                            └─────────────────┘
```

## 🛠️ Tecnologías

### Backend

- **Node.js**: Entorno de ejecución para JavaScript
- **Express.js**: Framework web minimalista y flexible
- **PostgreSQL**: Base de datos relacional de código abierto
- **Sequelize/pg**: ORM (Object-Relational Mapping) para PostgreSQL
- **API RESTful**: Arquitectura para servicios web

### Frontend

- **Ionic Framework**: Framework para aplicaciones móviles híbridas
- **React**: Biblioteca de JavaScript para construir interfaces de usuario
- **TypeScript**: Lenguaje de programación
- **CSS3/Sass**: Estilos y diseño responsive

## 📁 Estructura del Proyecto

```
StarWiki-App/
├── backend/
│   └── src/
│       ├── modules/             # Módulos por dominio de negocio
│       │   ├── auth/            # Autenticación y autorización
│       │   ├── categories/      # Gestión de categorías del blog
│       │   ├── comments/        # Sistema de comentarios
│       │   ├── email/           # Gestión de correos electrónicos
│       │   ├── posts/           # Gestión de posts del blog
│       │   └── users/           # Gestión de usuarios
│       ├── routes/              # Definición de rutas de la API
│       │   └── index.js         # Rutas principales
│       ├── shared/              # Código compartido entre módulos
│       │   ├── config/          # Configuración de la aplicación
│       │   ├── interfaces/      # Interfaces para patrón repository
│       │   ├── middlewares/     # Middlewares personalizados
│       │   └── models/      # Modelos de datos (Sequelize)
│       └── server.js            # Punto de entrada del servidor
├── frontend/
│   ├── src/
│   │   ├── components/          # Componentes reutilizables
│   │   ├── pages/               # Páginas de la aplicación
│   │   ├── services/            # Servicios para API calls
│   │   └── styles/              # Estilos CSS/Sass
│   ├── public/                  # Archivos estáticos
│   └── ionic.config.json        # Configuración de Ionic
├── docs/                        # Documentación
└── README.md
```

### 💡 Estructura Interna de Módulos

Cada módulo en `src/modules/` sigue una estructura consistente que promueve la separación de responsabilidades y facilita el mantenimiento:

```
modules/auth/
├── controllers/    # Controladores del módulo
├── processes/      # Procesos en segundo plano y tareas
├── repositories/   # Patrón Repository para acceso a datos
├── routes.js       # Rutas del módulo
├── services/       # Lógica de negocio
└── validators/     # Validaciones específicas

```

**Descripción de cada carpeta:**

- **`controllers/`**: Maneja las peticiones HTTP y coordina entre servicios
- **`processes/`**: Procesos en segundo plano y tareas independientes
- **`repositories/`**: Acceso a datos mediante el patrón Repository
- **`routes.js`**: Define las rutas específicas del módulo
- **`services/`**: Contiene la lógica de negocio y reglas del dominio
- **`validators/`**: Validaciones específicas del módulo

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn
- Ionic CLI

### Backend

1. Navega al directorio del backend:

   ```bash
   cd backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   ```bash
   .env
   # Edita .env con tu configuración de PostgreSQL
   ```

4. Inicia el servidor:
   ```bash
   npm start
   # o para desarrollo
   npm run dev
   ```

### Frontend

1. Navega al directorio del frontend:

   ```bash
   cd frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura la URL de la API en el archivo de configuración

4. Inicia la aplicación:
   ```bash
   ionic serve
   ```

## 🔧 Scripts Disponibles

### Backend

- `npm start` - Inicia el servidor en producción
- `npm run dev` - Inicia el servidor en modo desarrollo
- `npm run lint` - Ejecuta el linter

### Frontend

- `ionic serve` - Inicia la aplicación en desarrollo
- `ionic build` - Construye la aplicación para producción
- `ionic capacitor run ios` - Ejecuta en iOS
- `ionic capacitor run android` - Ejecuta en Android

## 🌟 Características Futuras

- [ ] Sistema de comentarios
- [ ] Categorías y etiquetas
- [ ] Búsqueda avanzada
- [ ] Sistema de notificaciones
- [ ] Modo oscuro
- [ ] PWA (Progressive Web App)
- [ ] Integración con redes sociales

## 👥 Autores

- **Alan Yahir García Bernal** - _Desarrollo inicial_ - [GitHub](https://github.com/AlanGaber11)
