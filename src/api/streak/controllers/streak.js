'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::streak.streak', () => ({
  async findMe(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const streak = await strapi.service('api::streak.streak').recordActivity(userId);
    return { data: streak };
  },
}));
