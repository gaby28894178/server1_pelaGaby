# 📋 API Endpoints - Sistema de Clínica

Base URL: `http://localhost:3002`

---

## 🔐 Autenticación (Users)

Base: `/api/users`

### 1. Registrar Paciente
**POST** `/api/users`

Crea un nuevo usuario con rol de paciente.

**Body (JSON):**
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

**Respuesta exitosa (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": 1,
    "email": "juan@example.com",
    "role": "paciente",
    "patient": {
      "id": 1,
      "nombre": "Juan",
      "apellido": "Pérez"
    }
  }
}
```

**Errores:**
- `400`: Email ya registrado
- `500`: Error del servidor

---

### 2. Login
**POST** `/api/users/login`

Inicia sesión y devuelve un token JWT.

**Body (JSON):**
```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

**Respuesta exitosa (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "juan@example.com",
    "role": "paciente",
    "patient": {
      "id": 1,
      "nombre": "Juan",
      "apellido": "Pérez",
      "telefono": "1234567890",
      "edad": 30
    },
    "doctor": null
  }
}
```

**Errores:**
- `401`: Credenciales inválidas
- `500`: Error del servidor

---

### 3. Ver Todos los Usuarios (Protegida)
**GET** `/api/users`

Lista todos los usuarios del sistema.

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "email": "juan@example.com",
    "role": "paciente",
    "created_at": "2026-03-12T...",
    "patient": {
      "id": 1,
      "nombre": "Juan",
      "apellido": "Pérez"
    },
    "doctor": null
  }
]
```

**Errores:**
- `401`: Token inválido o no proporcionado
- `500`: Error del servidor

---

### 4. Ver Perfil Completo (Protegida)
**GET** `/api/users/profile`

Obtiene el perfil completo del usuario autenticado con:
- Información del usuario
- Datos de paciente/doctor
- Últimos 10 pagos
- Últimos 10 turnos
- Últimas 10 historias clínicas
- Últimos 10 análisis

**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "email": "juan@example.com",
  "role": "paciente",
  "created_at": "2026-03-12T...",
  "patient": {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "telefono": "1234567890",
    "edad": 30,
    "peso": null,
    "altura": null,
    "appointments": [
      {
        "id": 1,
        "fecha_hora": "2026-03-25T10:00:00Z",
        "motivo": "Control de rutina",
        "estado": "programada"
      }
    ],
    "medical_records": [
      {
        "id": 1,
        "diagnostico": "Hipertensión",
        "tratamiento": "Medicación",
        "notas": "Paciente estable"
      }
    ],
    "analysis": [
      {
        "id": 1,
        "tipo": "sangre",
        "resultado": "Normal",
        "fecha": "2026-03-20T..."
      }
    ]
  },
  "payments": [
    {
      "id": 1,
      "monto": "150.00",
      "metodo_pago": "tarjeta",
      "concepto": "Consulta médica",
      "estado": "completado"
    }
  ]
}
```

**Errores:**
- `401`: Token inválido o no proporcionado
- `404`: Usuario no encontrado
- `500`: Error del servidor

---

## 🏥 Rutas Disponibles Actualmente

### Implementadas:
- ✅ POST `/api/users` - Registrar paciente
- ✅ POST `/api/users/login` - Login
- ✅ GET `/api/users` - Ver todos los usuarios (protegida)
- ✅ GET `/api/users/profile` - Ver perfil completo (protegida)

### Por implementar:
- ⏳ Rutas de Doctores
- ⏳ Rutas de Pagos
- ⏳ Rutas de Turnos/Citas
- ⏳ Rutas de Historias Clínicas
- ⏳ Rutas de Análisis Médicos

---

## 🔑 Autenticación

Todas las rutas marcadas como "Protegida" requieren un token JWT en el header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

El token se obtiene al hacer login y expira en 1 día.

---

## 📊 Modelos de Base de Datos

### Users
- id, email, password, role (admin/doctor/paciente)

### Patients
- id, user_id, nombre, apellido, telefono, edad, peso, altura

### Doctors
- id, user_id, nombre, apellido, especialidad

### Payments
- id, user_id, monto, metodo_pago, concepto, estado

### Appointments
- id, patient_id, doctor_id, fecha_hora, motivo, estado, notas

### Medical Records
- id, patient_id, doctor_id, diagnostico, tratamiento, notas

### Analysis
- id, patient_id, doctor_id, tipo, resultado, fecha, archivo_url

---

**Última actualización:** Marzo 2026
