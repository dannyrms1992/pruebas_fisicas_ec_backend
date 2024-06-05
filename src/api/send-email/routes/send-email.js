module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/restore-password',
     handler: 'send-email.RestorePassword',
   
    },
  ],
};
