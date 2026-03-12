import { query } from '../utils/db.js';

export const setupUserTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      rol VARCHAR(50) DEFAULT 'user',
      creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  return await query(sql);
};

export const createUser = async (nombre, email) => {
  const sql = 'INSERT INTO usuarios (nombre, email) VALUES ($1, $2) RETURNING *';
  const res = await query(sql, [nombre, email]);
  return res.rows[0];
};

export const findUserByEmail = async (email) => {
  const sql = 'SELECT * FROM usuarios WHERE email = $1';
  const res = await query(sql, [email]);
  return res.rows[0];
};