import express from 'express';
import { resolve } from 'path';
import 'dotenv/config';

const app = express();

// process.cwd() obtiene la carpeta raíz de tu proyecto (donde está el package.json)
const publicPath = resolve(process.cwd(), 'public');

// 1. Servir archivos estáticos (Para las imágenes)
app.use(express.static(publicPath));

// 2. Ruta principal
app.get('/', (req, res) => {
    // Enviamos el HTML usando la ruta detectada
    res.sendFile(resolve(publicPath, 'index.html'));
});

app.get('/test', (req, res) => {
    res.json({ 
        msj: "backend ok",
        donde_busco_el_html: resolve(publicPath, 'index.html'),
        existe_la_carpeta: publicPath
    });
});

export default app;

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
  
    });
}