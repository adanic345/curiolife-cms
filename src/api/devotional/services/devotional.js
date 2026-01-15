'use strict';

/**
 * devotional service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::devotional.devotional');
