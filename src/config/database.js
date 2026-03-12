import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar variables de entorno PRIMERO
dotenv.config();

// Verificar que DATABASE_URL existe
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL no está definida en el archivo .env');
  process.exit(1);
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Cambia a console.log para ver las queries SQL
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Probar conexión
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL exitosa');
  } catch (error) {
    console.error('❌ Error conectando a PostgreSQL:', error.message);
  }
};

export default sequelize;
