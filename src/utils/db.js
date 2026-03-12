import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

// Validamos que la URL exista antes de intentar conectar
if (!process.env.POSTGRES_URL) {
    console.error("❌ ERROR: No se encontró POSTGRES_URL en el archivo .env");
}

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  // SSL desactivado en local para evitar errores de conexión
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : false
});

export const query = (text, params) => pool.query(text, params);
export default pool;