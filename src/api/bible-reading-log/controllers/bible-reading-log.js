'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::bible-reading-log.bible-reading-log', () => ({
  async find(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    ctx.query = {
      ...ctx.query,
      filters: { ...ctx.query.filters, user: { id: userId } },
      sort: ['readAt:desc'],
    };
    return super.find(ctx);
  },

  async create(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    ctx.request.body.data = {
      ...ctx.request.body.data,
      user: userId,
      readAt: ctx.request.body.data.readAt ?? new Date().toISOString(),
    };

    const result = await super.create(ctx);

    await strapi.service('api::streak.streak').recordActivity(userId);

    return result;
  },
}));
