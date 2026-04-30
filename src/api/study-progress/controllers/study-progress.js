'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::study-progress.study-progress', () => ({
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

    const { studyDocumentId, study, currentDay, startedAt, sessionsCompleted } = ctx.request.body.data ?? {};

    const entry = await strapi.documents('api::study-progress.study-progress').create({
      data: {
        user: userId,
        study: studyDocumentId ?? study,
        currentDay: currentDay ?? 1,
        startedAt: startedAt ?? new Date().toISOString(),
        sessionsCompleted: sessionsCompleted ?? [],
      },
    });

    await strapi.service('api::streak.streak').recordActivity(userId);

    return { data: entry };
  },

  async update(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const existing = await strapi.documents('api::study-progress.study-progress').findOne({
      documentId: ctx.params.documentId,
      populate: ['user'],
    });

    if (!existing || existing.user?.id !== userId) return ctx.forbidden();

    const { currentDay, sessionsCompleted, completedAt } = ctx.request.body.data ?? {};

    const entry = await strapi.documents('api::study-progress.study-progress').update({
      documentId: ctx.params.documentId,
      data: { currentDay, sessionsCompleted, completedAt },
    });

    if (sessionsCompleted) {
      await strapi.service('api::streak.streak').recordActivity(userId);
    }

    return { data: entry };
  },
}));
