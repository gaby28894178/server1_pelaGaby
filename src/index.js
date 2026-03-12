import express from 'express';
import cors from 'cors';
import { resolve } from 'path';
import 'dotenv/config';

// Importamos solo lo que necesitamos
import userRoutes from './routes/userRoutes.js';
import { setupUserTable } from './models/userModel.js';

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Carpeta pública (Funciona en Local y Vercel)
const publicPath = resolve(process.cwd(), 'public');
app.use(express.static(publicPath));

// Inicializar la tabla de Usuarios (Solo usuarios)
const initDB = async () => {
    try {
        await setupUserTable();
        console.log("✅ Conexión a Postgres exitosa y tabla de usuarios lista.");
    } catch (err) {
        console.error("⚠️ Aviso: Revisa la conexión a Postgres en el .env:", err.message);
    }
};

initDB();

// Rutas de Usuario
app.use('/api/users', userRoutes);

// Ruta principal para el Dashboard
app.get('/', (req, res) => {
  res.sendFile(resolve(publicPath, 'index.html'));
});
app.use("/test",(req,res)=>{
    res.send("OKOPK")
})

// Esto permite que Vercel maneje la app como una función
export default app;

// Esto arranca el servidor en tu computadora
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor activo en: http://localhost:${PORT}`);
});