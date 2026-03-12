-- Ejecutar en pgAdmin o psql para resetear la base de datos

-- Conectarse a postgres (base de datos por defecto)
-- psql -U postgres

-- Borrar la base de datos
DROP DATABASE IF EXISTS mi_app_db;

-- Crear de nuevo
CREATE DATABASE mi_app_db OWNER postgres;

-- Verificar
\l
