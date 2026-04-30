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

    const { devotionalDocumentId, devotional, completedAt, timeSpentSeconds } = ctx.request.body.data ?? {};

    const entry = await strapi.documents('api::devotional-progress.devotional-progress').create({
      data: {
        user: userId,
        devotional: devotionalDocumentId ?? devotional,
        completedAt: completedAt ?? new Date().toISOString(),
        timeSpentSeconds,
      },
    });

    await strapi.service('api::streak.streak').recordActivity(userId);

    return { data: entry };
  },

  async update(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const existing = await strapi.documents('api::devotional-progress.devotional-progress').findOne({
      documentId: ctx.params.documentId,
      populate: ['user'],
    });

    if (!existing || existing.user?.id !== userId) return ctx.forbidden();

    const { completedAt, timeSpentSeconds } = ctx.request.body.data ?? {};

    const entry = await strapi.documents('api::devotional-progress.devotional-progress').update({
      documentId: ctx.params.documentId,
      data: { completedAt, timeSpentSeconds },
    });

    return { data: entry };
  },
}));
