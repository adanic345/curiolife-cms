'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::devotional-progress.devotional-progress', () => ({
  async find(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    ctx.query = {
      ...ctx.query,
      filters: { ...ctx.query.filters, user: { id: userId } },
    };
    return super.find(ctx);
  },

  async create(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    ctx.request.body.data = { ...ctx.request.body.data, user: userId };

    const result = await super.create(ctx);

    await strapi.service('api::streak.streak').recordActivity(userId);

    return result;
  },

  async update(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const entry = await strapi.documents('api::devotional-progress.devotional-progress').findOne({
      documentId: ctx.params.documentId,
      populate: ['user'],
    });

    if (!entry || entry.user?.id !== userId) return ctx.forbidden();

    return super.update(ctx);
  },
}));
