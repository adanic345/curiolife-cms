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

    ctx.request.body.data = {
      ...ctx.request.body.data,
      user: userId,
      enrolledAt: ctx.request.body.data.enrolledAt ?? new Date().toISOString(),
    };

    return super.create(ctx);
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
