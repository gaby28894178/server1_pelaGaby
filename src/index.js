import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { resolve } from 'path';
import 'dotenv/config';

import { testConnection } from './config/database.js';
import { syncDatabase } from './models/index.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middlewares
app.use(helmet({ contentSecurityPolicy: false })); // CSP a veces bloquea scripts en Vercel
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = resolve(process.cwd(), 'public');
app.use(express.static(publicPath));

// Inicializar base de datos - QUITAMOS EL IF DE PRODUCTION
// Queremos que conecte siempre, tanto en local como en Vercel
const initDB = async () => {
  try {
    await testConnection();
    // syncDatabase() puede ser pesado en Serverless, 
    // pero si lo necesitas para crear tablas, déjalo.
    await syncDatabase(); 
    console.log("✅ Base de datos conectada");
  } catch (err) {
    console.error("⚠️ Error DB:", err.message);
  }
};

initDB();

// Rutas
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.sendFile(resolve(publicPath, 'index.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || ' Internal Server Error'
  });
});

export default app;

// Solo para local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
}