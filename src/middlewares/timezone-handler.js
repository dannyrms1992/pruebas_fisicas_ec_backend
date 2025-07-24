module.exports = (config, { strapi }) => {
  return (ctx, next) => {
    // Interceptar requests de publicaciones
    if (ctx.request.url.includes('/api/publicaciones') && ctx.request.method === 'POST') {
      if (ctx.request.body && ctx.request.body.data && ctx.request.body.data.Fecha) {
        let fecha = ctx.request.body.data.Fecha;
        console.log('Fecha original recibida:', fecha);
        
        // Si la fecha tiene offset de Ecuador (-05:00), ajustarla para que se almacene correctamente
        if (fecha.includes('-05:00')) {
          // Parsear la fecha y mantener la hora local
          const fechaLocal = new Date(fecha);
          // Crear nueva fecha sin conversión automática a UTC
          const año = fechaLocal.getFullYear();
          const mes = String(fechaLocal.getMonth() + 1).padStart(2, '0');
          const dia = String(fechaLocal.getDate()).padStart(2, '0');
          const hora = String(fechaLocal.getHours()).padStart(2, '0');
          const minuto = String(fechaLocal.getMinutes()).padStart(2, '0');
          const segundo = String(fechaLocal.getSeconds()).padStart(2, '0');
          
          // Formatear como datetime local (sin zona horaria)
          const fechaAjustada = `${año}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
          ctx.request.body.data.Fecha = fechaAjustada;
          console.log('Fecha ajustada para Ecuador:', fechaAjustada);
        }
      }
    }
    
    // También manejar comentarios
    if (ctx.request.url.includes('/api/comentarios') && ctx.request.method === 'POST') {
      if (ctx.request.body && ctx.request.body.data && ctx.request.body.data.Fecha) {
        let fecha = ctx.request.body.data.Fecha;
        console.log('Fecha comentario original:', fecha);
        
        if (fecha.includes('-05:00')) {
          const fechaLocal = new Date(fecha);
          const año = fechaLocal.getFullYear();
          const mes = String(fechaLocal.getMonth() + 1).padStart(2, '0');
          const dia = String(fechaLocal.getDate()).padStart(2, '0');
          const hora = String(fechaLocal.getHours()).padStart(2, '0');
          const minuto = String(fechaLocal.getMinutes()).padStart(2, '0');
          const segundo = String(fechaLocal.getSeconds()).padStart(2, '0');
          
          const fechaAjustada = `${año}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
          ctx.request.body.data.Fecha = fechaAjustada;
          console.log('Fecha comentario ajustada:', fechaAjustada);
        }
      }
    }
    
    return next();
  };
};
