'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const defaultPopulate = { featuredImage: true, bannerImage: true };

const mergePopulate = (incoming) => {
  if (!incoming) return defaultPopulate;
  if (incoming === '*') return '*';
  if (Array.isArray(incoming))
    return Array.from(new Set([...incoming, 'featuredImage', 'bannerImage']));
  if (typeof incoming === 'object')
    return { ...defaultPopulate, ...incoming };
  return defaultPopulate;
};

module.exports = createCoreController('api::challenge.challenge', () => ({
  async find(ctx) {
    ctx.query = { ...ctx.query, populate: mergePopulate(ctx.query.populate) };
    return super.find(ctx);
  },

  async findOne(ctx) {
    ctx.query = { ...ctx.query, populate: mergePopulate(ctx.query.populate) };
    return super.findOne(ctx);
  },
}));
