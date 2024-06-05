'use strict';

/**
 * tienda service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tienda.tienda');
