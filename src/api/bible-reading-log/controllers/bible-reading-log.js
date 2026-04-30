'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::bible-reading-log.bible-reading-log', () => ({
  async find(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const { page = 1, pageSize = 50 } = ctx.query.pagination ?? {};

    const entries = await strapi.documents('api::bible-reading-log.bible-reading-log').findMany({
      filters: { user: { id: userId } },
      sort: ['readAt:desc'],
      start: (page - 1) * pageSize,
      limit: pageSize,
    });

    return { data: entries };
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
