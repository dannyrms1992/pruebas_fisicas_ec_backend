'use strict';

/**
 * A set of functions called "actions" for `estadisticas-usuario`
 */

module.exports = {


  generateData: async (ctx, next) => {
    try {
      var fechas = ctx.request.body.fechas;
      var idUser = ctx.request.body.idUser;
      var tipo = ctx.request.body.tipo;
      const generateReport = await strapi
        .service("api::estadisticas-usuario.estadisticas-usuario")
        .generateReportByUser( tipo,fechas,idUser);
      ctx.body = JSON.stringify(generateReport);
    } catch (err) {
      ctx.body = err;
    }
  },
  generateDataCoach: async (ctx, next) => {
    try {
      var fechas = ctx.request.body.fechas;
      var idClase = ctx.request.body.idClase;
      var tipo = ctx.request.body.tipo;
      const generateReport = await strapi
        .service("api::estadisticas-usuario.estadisticas-usuario")
        .generateReportByCoach( tipo,fechas,idClase);
      ctx.body = JSON.stringify(generateReport);
    } catch (err) {
      ctx.body = err;
    }
  }
};
