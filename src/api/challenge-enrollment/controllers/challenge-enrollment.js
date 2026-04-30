'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::challenge-enrollment.challenge-enrollment', () => ({
  async find(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const entries = await strapi.documents('api::challenge-enrollment.challenge-enrollment').findMany({
      filters: { user: { id: userId } },
      populate: ['challenge'],
      sort: ['enrolledAt:desc'],
    });

    return { data: entries };
  },

  async create(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const { challengeDocumentId, challenge, enrolledAt, currentDay, daysCompleted } = ctx.request.body.data ?? {};

    const entry = await strapi.documents('api::challenge-enrollment.challenge-enrollment').create({
      data: {
        user: userId,
        challenge: challengeDocumentId ?? challenge,
        enrolledAt: enrolledAt ?? new Date().toISOString(),
        currentDay: currentDay ?? 1,
        daysCompleted: daysCompleted ?? [],
      },
    });

    return { data: entry };
  },

  async update(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const existing = await strapi.documents('api::challenge-enrollment.challenge-enrollment').findOne({
      documentId: ctx.params.documentId,
      populate: ['user'],
    });

    if (!existing || existing.user?.id !== userId) return ctx.forbidden();

    const { currentDay, daysCompleted, completedAt } = ctx.request.body.data ?? {};

    const entry = await strapi.documents('api::challenge-enrollment.challenge-enrollment').update({
      documentId: ctx.params.documentId,
      data: { currentDay, daysCompleted, completedAt },
    });

    if (daysCompleted) {
      await strapi.service('api::streak.streak').recordActivity(userId);
    }

    return { data: entry };
  },

  async delete(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const existing = await strapi.documents('api::challenge-enrollment.challenge-enrollment').findOne({
      documentId: ctx.params.documentId,
      populate: ['user'],
    });

    if (!existing || existing.user?.id !== userId) return ctx.forbidden();

    await strapi.documents('api::challenge-enrollment.challenge-enrollment').delete({
      documentId: ctx.params.documentId,
    });

    return { data: { documentId: ctx.params.documentId } };
  },
}));
