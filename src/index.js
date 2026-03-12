import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { resolve } from 'path';
import 'dotenv/config';

// Importar configuración de base de datos y modelos
import { testConnection } from './config/database.js';
import { syncDatabase } from './models/index.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middlewares globales
// Desactivamos CSP para evitar que bloquee tu frontend en Vercel
app.use(helmet({ contentSecurityPolicy: false })); 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Manejo de archivos estáticos (Carpeta public)
const publicPath = resolve(process.cwd(), 'public');
app.use(express.static(publicPath));

// INICIALIZACIÓN DE DB (Optimizado para Serverless)
const initDB = async () => {
  try {
    // En Vercel, testConnection es vital para despertar la DB (Cold Start)
    await testConnection();
    
    // Solo ejecutamos syncDatabase en desarrollo local
    // En producción (Vercel), las tablas ya deben estar creadas
    if (process.env.NODE_ENV !== 'production') {
      await syncDatabase();
      console.log("✅ DB Local: Tablas sincronizadas");
    } else {
      console.log("✅ DB Producción: Conexión verificada");
    }
  } catch (err) {
    // IMPORTANTE: No lanzamos error (throw), solo logueamos para que el server no crashee
    console.error("⚠️ Error DB al iniciar:", err.message);
  }
};

// Ejecutamos la promesa sin bloquear el flujo principal de Express
initDB();

// --- RUTAS API ---
app.use('/api/users', userRoutes);

// Ruta para testear que el backend responde
app.get('/api/health', (req, res) => {
  res.json({ status: 'up', env: process.env.NODE_ENV });
});

// --- RUTA FRONTEND ---
app.get('/', (req, res) => {
  res.sendFile(resolve(publicPath, 'index.html'));
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error("❌ Error detectado:", err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Error interno del servidor'
  });
});

// EXPORTAR PARA VERCEL
// Es lo más importante para que Vercel reconozca la función
export default app;

// ARRANQUE LOCAL
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📂 Carpeta pública en: ${publicPath}`);
  });
}