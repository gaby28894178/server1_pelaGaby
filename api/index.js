// import express from 'express';
// import { join, dirname } from 'path';
// import { fileURLToPath } from 'url';
// import 'dotenv/config';

// // 1. Configuración de rutas para ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();

// // 2. Middlewares 
// // Usamos path.resolve para asegurar que encuentre 'public' en Vercel
// app.use(express.static(join(__dirname, '../public'))); 

// const PORT = process.env.PORT || 3000;

// // 3. Rutas de tu API
// app.get('/', (req, res) => {
//     res.send('Servidor funcionando correctamente welcome');
// });

// app.get('/ping', (req, res) => {
//     res.json({
//         msj: "backend ok"
//     });
// });

// // 4. IMPORTANTE: app.listen() es opcional en Vercel, 
// // pero sirve para desarrollo local.
// if (process.env.NODE_ENV !== 'production') {
//     app.listen(PORT, () => {
//         console.log(`Servidor local en http://localhost:${PORT}`);
//     });
// }

// // 5. ESTO ES LO QUE TE FALTABA: Exportar la app para Vercel
// export default app;