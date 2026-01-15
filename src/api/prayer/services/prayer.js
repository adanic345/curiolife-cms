'use strict';

/**
 * prayer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::prayer.prayer');
