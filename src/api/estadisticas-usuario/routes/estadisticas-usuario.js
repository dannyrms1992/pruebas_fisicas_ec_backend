module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/estadisticas-usuario',
     handler: 'estadisticas-usuario.generateData'
    },
    {
      method: 'POST',
      path: '/estadisticas-usuario/entrenador',
      handler: 'estadisticas-usuario.generateDataCoach'
     },
  ],
};
