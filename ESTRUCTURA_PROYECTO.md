# 📁 Estructura del Proyecto - Sistema Clínica

## ✅ Archivos Activos

### Configuración
```
src/config/
  └── database.js          # Conexión Sequelize a PostgreSQL
```

### Modelos (Sequelize)
```
src/models/
  ├── index.js             # Exporta todos los modelos y sincroniza DB
  ├── User.js              # Usuarios (admin, doctor, paciente)
  ├── Patient.js           # Pacientes
  ├── Doctor.js            # Doctores
  ├── Payment.js           # Pagos
  ├── Appointment.js       # Turnos/Citas
  ├── MedicalRecord.js     # Historias Clínicas
  └── Analysis.js          # Análisis Médicos
```

### Controladores
```
src/controllers/
  └── userController.js    # Register, Login, GetAll, GetProfile
```

### Middlewares
```
src/middlewares/
  └── verifyJwt.js         # Verifica token JWT en rutas protegidas
```

### Rutas
```
src/routes/
  └── userRoutes.js        # POST /register, /login | GET /, /profile
```

### Principal
```
src/
  └── index.js             # Servidor Express principal
```

---

## 🗑️ Archivos Eliminados (Limpieza)

- ❌ `src/middlewares/authMiddleware.js` (simulación vieja)
- ❌ `src/services/auth.service.js` (no se usaba)
- ❌ `src/utils/db.js` (reemplazado por Sequelize)
- ❌ `src/models/userModel.js` (reemplazado por User.js con Sequelize)

---

## 📊 Flujo de Autenticación

```
1. Usuario hace POST /api/users (registro)
   └── userController.register()
       └── Sequelize crea User y Patient
       └── Devuelve datos del usuario

2. Usuario hace POST /api/users/login
   └── userController.login()
       └── Verifica password con bcrypt
       └── Genera JWT token
       └── Devuelve token + datos usuario

3. Usuario hace GET /api/users/profile (con token)
   └── verifyJwt middleware verifica token
   └── userController.getProfile()
       └── Sequelize busca usuario con includes
       └── Devuelve perfil completo con relaciones
```

---

## 🔧 Middlewares Explicados

### `verifyJwt.js`
**Qué hace:**
- Verifica que el header `Authorization: Bearer {token}` exista
- Decodifica el token JWT
- Valida que sea válido y no haya expirado
- Agrega `req.user` con los datos del token (id, email, role)
- Si todo está bien, llama a `next()` para continuar
- Si falla, devuelve error 401 o 403

**Cuándo se usa:**
- En rutas protegidas que requieren autenticación
- Ejemplo: `GET /api/users` y `GET /api/users/profile`

---

## 🎯 Servicios (No implementados aún)

Los controladores actualmente tienen toda la lógica. Para mejor organización, se pueden crear servicios:

```
src/services/
  ├── userService.js       # Lógica de usuarios
  ├── patientService.js    # Lógica de pacientes
  ├── doctorService.js     # Lógica de doctores
  ├── paymentService.js    # Lógica de pagos
  └── appointmentService.js # Lógica de turnos
```

**Ventaja de servicios:**
- Separa lógica de negocio de controladores
- Reutilizable en diferentes partes
- Más fácil de testear

---

## 📦 Dependencias Principales

```json
{
  "sequelize": "6.37.3",      // ORM para PostgreSQL
  "pg": "8.12.0",              // Driver PostgreSQL
  "bcrypt": "5.1.1",           // Hash de contraseñas
  "jsonwebtoken": "9.0.2",     // JWT tokens
  "express": "4.19.2",         // Framework web
  "cors": "2.8.5",             // CORS
  "helmet": "7.1.0",           // Seguridad headers
  "dotenv": "16.4.5"           // Variables de entorno
}
```

---

## 🚀 Próximos Pasos

1. ✅ Modelos creados con Sequelize
2. ✅ Autenticación funcionando
3. ✅ Registro y login de pacientes
4. ⏳ Crear controladores para:
   - Doctores
   - Pagos
   - Turnos
   - Historias Clínicas
   - Análisis
5. ⏳ Crear rutas para cada módulo
6. ⏳ Agregar validaciones con Joi o Zod
7. ⏳ Agregar roles y permisos

---

**Estado actual:** Base funcional con autenticación JWT y modelos Sequelize listos
