module.exports = (config, { strapi }) => {
  return (ctx, next) => {
    // Interceptar requests de publicaciones
    if (ctx.request.url.includes('/api/publicaciones') && ctx.request.method === 'POST') {
      if (ctx.request.body && ctx.request.body.data && ctx.request.body.data.Fecha) {
        // Si la fecha no tiene zona horaria, asumirla como hora local de Ecuador
        let fecha = ctx.request.body.data.Fecha;
        if (!fecha.includes('Z') && !fecha.includes('+') && !fecha.includes('-', 10)) {
          // Agregar offset de Ecuador (UTC-5)
          fecha = fecha + '-05:00';
          ctx.request.body.data.Fecha = fecha;
          console.log('Fecha ajustada para Ecuador:', fecha);
        }
      }
    }
    return next();
  };
};
