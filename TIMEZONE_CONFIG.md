# 🕐 Configuración de Zona Horaria - Backend

## 📋 Cambios Implementados

### 1. Configuración del Servidor
- Agregado timezone de Ecuador en `config/server.js`
- Configuración: `timezone: 'America/Guayaquil'`

### 2. Middleware Personalizado
- Creado `src/middlewares/timezone-handler.js`
- Procesa fechas con offset de Ecuador (-05:00)
- Convierte a formato local para almacenamiento

### 3. Registro de Middleware
- Agregado en `config/middlewares.js`
- Posición: después de body parser, antes de session

## 🔧 Archivos Modificados

1. `config/server.js` - Configuración de timezone
2. `src/middlewares/timezone-handler.js` - Middleware personalizado (nuevo)
3. `config/middlewares.js` - Registro del middleware

## 🚀 Implementación en Producción

```bash
# En el servidor Ubuntu
cd /ruta/del/backend
git pull origin main
pm2 restart strapi
```

## ✅ Estado
- ✅ Middleware funcionando
- ✅ Fechas procesadas correctamente
- ✅ Integración con frontend completa

---
**Fecha**: 24 de julio de 2025
**Estado**: Completado
