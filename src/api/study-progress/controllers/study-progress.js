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

    const { studyDocumentId, ...rest } = ctx.request.body.data ?? {};
    ctx.request.body.data = {
      ...rest,
      user: userId,
      ...(studyDocumentId ? { study: studyDocumentId } : {}),
    };

    const result = await super.create(ctx);

    await strapi.service('api::streak.streak').recordActivity(userId);

    return result;
  },

  async update(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const entry = await strapi.documents('api::study-progress.study-progress').findOne({
      documentId: ctx.params.documentId,
      populate: ['user'],
    });

    if (!entry || entry.user?.id !== userId) return ctx.forbidden();

    // Trigger streak when a session completion is recorded
    if (ctx.request.body.data?.sessionsCompleted) {
      await strapi.service('api::streak.streak').recordActivity(userId);
    }

    return super.update(ctx);
  },
}));
