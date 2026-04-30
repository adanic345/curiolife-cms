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

    const { book, chapter, translation, readAt } = ctx.request.body.data ?? {};

    const entry = await strapi.documents('api::bible-reading-log.bible-reading-log').create({
      data: {
        user: userId,
        book,
        chapter,
        translation,
        readAt: readAt ?? new Date().toISOString(),
      },
    });

    await strapi.service('api::streak.streak').recordActivity(userId);

    return { data: entry };
  },
}));
