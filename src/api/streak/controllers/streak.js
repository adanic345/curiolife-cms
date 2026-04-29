'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::streak.streak', () => ({
  // GET /streaks/me — returns the user's streak, creating it if it doesn't exist yet
  async findMe(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const streak = await strapi.service('api::streak.streak').recordActivity(userId);
    return { data: streak };
  },
}));
