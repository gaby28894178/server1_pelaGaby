# 🚀 Desplegar en Vercel

## Paso 1: Configurar Base de Datos en Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega estas variables:

```
DATABASE_URL = postgres://usuario:password@host:5432/database
JWT_SECRET = tu_secreto_super_seguro_aqui
NODE_ENV = production
PORT = 3000
```

## Paso 2: Crear Tablas en la Base de Datos de Producción

Desde tu computadora local, ejecuta:

```bash
# Asegúrate de tener DATABASE_URL de producción en .env
npm run migrate:vercel
```

O ejecuta el SQL manualmente en tu base de datos de producción.

## Paso 3: Desplegar

```bash
git add .
git commit -m "Configurar para Vercel"
git push
```

Vercel desplegará automáticamente.

## Paso 4: Verificar

1. Abre tu URL de Vercel: `https://tu-proyecto.vercel.app`
2. Deberías ver la página HTML
3. Prueba la API: `https://tu-proyecto.vercel.app/test`
4. Prueba registro: `POST https://tu-proyecto.vercel.app/api/users`

---

## ⚠️ Importante

- En Vercel, Sequelize NO sincroniza automáticamente (serverless)
- Debes crear las tablas manualmente con el script de migración
- La página HTML se sirve desde `/` 
- Las APIs están en `/api/*`

---

## 🔧 Solución de Problemas

### La página no se muestra
- Verifica que `public/index.html` exista
- Revisa los logs en Vercel Dashboard

### Error de base de datos
- Verifica que `DATABASE_URL` esté configurada en Vercel
- Asegúrate de que las tablas existan (ejecuta migrate:vercel)

### Error 500
- Revisa los logs en Vercel Dashboard
- Verifica que todas las variables de entorno estén configuradas
