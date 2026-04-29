'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::prayer.prayer', () => ({
  async find(ctx) {
    const defaultPopulate = { featuredImage: true, externalMedia: true };

    ctx.query = {
      ...ctx.query,
      populate:
        typeof ctx.query.populate === 'object'
          ? { ...defaultPopulate, ...ctx.query.populate }
          : defaultPopulate,
    };

    return await super.find(ctx);
  },

  async findOne(ctx) {
    const defaultPopulate = { featuredImage: true, externalMedia: true };

    ctx.query = {
      ...ctx.query,
      populate:
        typeof ctx.query.populate === 'object'
          ? { ...defaultPopulate, ...ctx.query.populate }
          : defaultPopulate,
    };

    return await super.findOne(ctx);
  },
}));
