'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const defaultPopulate = { featuredImage: true, externalMedia: true };

const mergePopulate = (incoming) => {
  if (!incoming) return defaultPopulate;
  if (incoming === '*') return '*';

  if (Array.isArray(incoming)) {
    return Array.from(new Set([...incoming, 'featuredImage', 'externalMedia']));
  }

  if (typeof incoming === 'object') {
    return { ...defaultPopulate, ...incoming };
  }

  return defaultPopulate;
};

module.exports = createCoreController('api::prayer.prayer', () => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: mergePopulate(ctx.query.populate),
    };

    return await super.find(ctx);
  },

  async findOne(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: mergePopulate(ctx.query.populate),
    };

    return await super.findOne(ctx);
  },
}));
