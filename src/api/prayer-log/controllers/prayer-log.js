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

    const { prayerDocumentId, prayer, prayedAt, durationSeconds, intention } = ctx.request.body.data ?? {};

    const entry = await strapi.documents('api::prayer-log.prayer-log').create({
      data: {
        user: userId,
        prayer: prayerDocumentId ?? prayer,
        prayedAt: prayedAt ?? new Date().toISOString(),
        durationSeconds,
        intention,
      },
    });

    await strapi.service('api::streak.streak').recordActivity(userId);

    return { data: entry };
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
