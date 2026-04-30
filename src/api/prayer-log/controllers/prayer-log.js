'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::prayer-log.prayer-log', () => ({
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

    // Force user to the authenticated user regardless of what the client sends
    ctx.request.body.data = { ...ctx.request.body.data, user: userId };

    const result = await super.create(ctx);

    // Update streak after logging a prayer
    await strapi.service('api::streak.streak').recordActivity(userId);

    return result;
  },

  async findOne(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const entry = await strapi.documents('api::prayer-log.prayer-log').findOne({
      documentId: ctx.params.documentId,
      populate: ['user', 'prayer'],
    });

    if (!entry || entry.user?.id !== userId) return ctx.forbidden();

    return { data: entry };
  },

  async delete(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const entry = await strapi.documents('api::prayer-log.prayer-log').findOne({
      documentId: ctx.params.documentId,
      populate: ['user'],
    });

    if (!entry || entry.user?.id !== userId) return ctx.forbidden();

    return super.delete(ctx);
  },
}));
