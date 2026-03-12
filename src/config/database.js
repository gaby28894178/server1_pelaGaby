import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar variables de entorno PRIMERO
dotenv.config();

// Verificar que DATABASE_URL existe (solo en desarrollo)
if (!process.env.DATABASE_URL && process.env.NODE_ENV !== 'production') {
  console.error('❌ ERROR: DATABASE_URL no está definida en el archivo .env');
  process.exit(1);
}

// En producción sin DATABASE_URL, usar una conexión dummy
const connectionString = process.env.DATABASE_URL || 'postgres://dummy:dummy@localhost:5432/dummy';

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: process.env.NODE_ENV === 'production' && process.env.DATABASE_URL ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {}
});

// Probar conexión (solo si hay DATABASE_URL real)
export const testConnection = async () => {
  if (!process.env.DATABASE_URL) {
    console.log('⚠️ Sin DATABASE_URL - modo sin base de datos');
    return;
  }
  
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL exitosa');
  } catch (error) {
    console.error('❌ Error conectando a PostgreSQL:', error.message);
  }
};

export default sequelize;
