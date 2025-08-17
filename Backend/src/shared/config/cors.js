const corsOptions = {
  origin: [
    "http://localhost:8100", // Frontend en desarrollo
    "https://ferre-plus-frontend.vercel.app", //! Producción,
    "https://ferre-plus-frontend-bz4ersdu5-alangaber11-gmailcoms-projects.vercel.app", //! Producción alternativa
  ],
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  optionsSuccessStatus: 200,
  maxAge: 86400, // 24 horas
};

module.exports = { corsOptions };
