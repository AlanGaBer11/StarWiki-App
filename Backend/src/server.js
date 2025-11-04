require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const sequelize = require("./shared/config/db");
const corsOptions = require("./shared/config/cors");

// IMPORTAR RUTAS PRINCIPALES
const routes = require("./routes/index");

// Sincronizar modelos con la base de datos
sequelize
  .sync({ alter: true }) // alter: true para crear tablas si no existen
  .then(() => {
    console.log("✅ Modelos sincronizados con la base de datos");
  })
  .catch((error) => {
    console.error("❌ Error al sincronizar modelos:", error);
  });

// INICIALIZAR LA APLICACIÓN
const app = express();

// CAPA DE SEGURIDAD
app.use(helmet());

const PORT = process.env.PORT || 3000;

// LÍMITE DE PETICIONES
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 MINUTO
  limit: 100, // 100 PETICIONES POR MINUTO,
  message: "¡Demasiadas peticiones!",
  standardHeaders: true,
  handler: (req, res) => {
    console.log("⚠️ IP Bloqueada, alcanzó el límite de peticiones");
    res.status(409).json({ error: "Demasiadas peticiones!" });
  },
});

// APLICAR EL LÍMITE DE PETICIONES A TODAS LAS RUTAS
app.use(limiter);

// APLICAR CORS
app.use(cors(corsOptions));

app.use(bodyParser.json());

// RUTA DE BIENVENIDA
app.get("/api/v2", (req, res) => {
  res.send("🔧 Bienvenido a StarWiki API");
});

// USAR TODAS LAS RUTAS
app.use("/api/v2", routes);

// RUTAS QUE NO EXISTEN
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "🔍 Ruta no encontrada",
    timestamp: new Date().toISOString(),
  });
});

// INICIAR EL SERVIDOR
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
