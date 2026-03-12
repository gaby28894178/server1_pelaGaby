import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { resolve } from 'path';
import 'dotenv/config';

// Importar configuración de base de datos
import { testConnection } from './config/database.js';
import { syncDatabase } from './models/index.js';

// Importar rutas
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middlewares globales
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carpeta pública
const publicPath = resolve(process.cwd(), 'public');
app.use(express.static(publicPath));

// Inicializar base de datos
const initDB = async () => {
  try {
    await testConnection();
    
    // Solo sincronizar en desarrollo local
    if (process.env.NODE_ENV !== 'production') {
      await syncDatabase();
    }
    
    console.log("✅ Base de datos lista");
  } catch (err) {
    console.error("⚠️ Error inicializando base de datos:", err.message);
  }
};

// Solo inicializar DB en desarrollo local
if (process.env.NODE_ENV !== 'production') {
  initDB();
}

// Rutas API
app.use('/api/users', userRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(resolve(publicPath, 'index.html'));
});

app.get('/test', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Backend funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Error interno del servidor'
  });
});

// Exportar para Vercel
export default app;

// Servidor local
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}
