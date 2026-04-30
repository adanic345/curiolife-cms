'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::challenge-enrollment.challenge-enrollment', () => ({
  async find(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    ctx.query = {
      ...ctx.query,
      filters: { ...ctx.query.filters, user: { id: userId } },
      populate: { challenge: true, ...ctx.query.populate },
    };
    return super.find(ctx);
  },

  async create(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const { challengeDocumentId, ...rest } = ctx.request.body.data ?? {};
    ctx.request.body.data = {
      ...rest,
      user: userId,
      enrolledAt: rest.enrolledAt ?? new Date().toISOString(),
      ...(challengeDocumentId ? { challenge: challengeDocumentId } : {}),
    };

    return super.create(ctx);
  },

  async delete(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const entry = await strapi.documents('api::challenge-enrollment.challenge-enrollment').findOne({
      documentId: ctx.params.documentId,
      populate: ['user'],
    });

    if (!entry || entry.user?.id !== userId) return ctx.forbidden();

    return super.delete(ctx);
  },

  async update(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const entry = await strapi.documents('api::challenge-enrollment.challenge-enrollment').findOne({
      documentId: ctx.params.documentId,
      populate: ['user'],
    });

    if (!entry || entry.user?.id !== userId) return ctx.forbidden();

    // Trigger streak when a challenge day is completed
    if (ctx.request.body.data?.daysCompleted) {
      await strapi.service('api::streak.streak').recordActivity(userId);
    }

    return super.update(ctx);
  },
}));
