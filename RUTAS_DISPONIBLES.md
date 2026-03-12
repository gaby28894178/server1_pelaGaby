# 🚀 Rutas Disponibles - Sistema Clínica

## ✅ Rutas Implementadas

### 1. Registrar Paciente
```
POST http://localhost:3002/api/users
```
**Body:**
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "password": "123456",
  "telefono": "1234567890",
  "edad": 30
}
```

---

### 2. Login
```
POST http://localhost:3002/api/users/login
```
**Body:**
```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```
**Respuesta:** Devuelve `token` que debes usar en las siguientes peticiones

---

### 3. Ver Todos los Usuarios (Protegida)
```
GET http://localhost:3002/api/users
```
**Header:**
```
Authorization: Bearer {tu_token_aqui}
```

---

### 4. Ver Perfil Completo (Protegida)
```
GET http://localhost:3002/api/users/profile
```
**Header:**
```
Authorization: Bearer {tu_token_aqui}
```
**Devuelve:**
- Información del usuario
- Datos de paciente
- Últimos 10 pagos
- Últimos 10 turnos
- Últimas 10 historias clínicas
- Últimos 10 análisis

---

### 5. Health Check
```
GET http://localhost:3002/test
```
Sin autenticación. Verifica que el servidor esté funcionando.

---

## 📦 Importar en Postman

1. Abre Postman
2. Click en **Import**
3. Selecciona el archivo: `doc/posman/postman-collection.json`
4. La colección se importará con todas las rutas configuradas
5. El token se guarda automáticamente al hacer login

---

## 🔑 Cómo Usar

1. **Registrar un usuario**: POST `/api/users`
2. **Hacer login**: POST `/api/users/login` (guarda el token)
3. **Usar rutas protegidas**: Agrega el header `Authorization: Bearer {token}`

---

## 📊 Base de Datos

Sequelize crea automáticamente estas tablas:
- ✅ users
- ✅ patients
- ✅ doctors
- ✅ payments
- ✅ appointments
- ✅ medical_records
- ✅ analysis

---

## 🎯 Próximos Pasos

Crear controladores y rutas para:
- Doctores (crear, listar, asignar pacientes)
- Pagos (crear, listar, actualizar estado)
- Turnos (crear, listar, cancelar)
- Historias Clínicas (crear, actualizar, ver)
- Análisis Médicos (crear, subir archivos, ver resultados)

---

**Puerto:** 3002  
**Base URL:** http://localhost:3002  
**Documentación completa:** `doc/rutas/endpoints.md`
