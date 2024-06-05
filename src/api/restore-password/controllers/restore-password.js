'use strict';

/**
 * A set of functions called "actions" for `restore-password`
 */

module.exports = {
  restorePassword: async (ctx, next) => {
    try {
      var decode = JSON.parse(ctx.request.body);

      var email = decode.email;
      var password = decode.password;
      var data = await strapi.entityService.findMany("plugin::users-permissions.user", {
        filters:{
          email: email
        },
       
        limit: 1000
      })
      var userId = data[0].id;
     var response =  await strapi.entityService.update("plugin::users-permissions.user", userId, {
        data: {
          password: password
        }
      });
      ctx.body = JSON.stringify(true);;
    } catch (err) {
      ctx.body = err;
    }
  }
};
