'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::streak.streak', () => ({
  // Called after any activity is logged. Finds or creates the user's streak
  // record and increments it if this is a new day.
  async recordActivity(userId) {
    const today = new Date().toISOString().split('T')[0];

    const existing = await strapi.documents('api::streak.streak').findFirst({
      filters: { user: { id: userId } },
    });

    if (!existing) {
      return strapi.documents('api::streak.streak').create({
        data: {
          user: userId,
          currentStreak: 1,
          longestStreak: 1,
          lastActivityDate: today,
          totalActiveDays: 1,
        },
      });
    }

    // Already recorded today — nothing to update
    if (existing.lastActivityDate === today) return existing;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const isConsecutive = existing.lastActivityDate === yesterdayStr;
    const newStreak = isConsecutive ? existing.currentStreak + 1 : 1;
    const newLongest = Math.max(newStreak, existing.longestStreak);

    return strapi.documents('api::streak.streak').update({
      documentId: existing.documentId,
      data: {
        currentStreak: newStreak,
        longestStreak: newLongest,
        lastActivityDate: today,
        totalActiveDays: existing.totalActiveDays + 1,
      },
    });
  },
}));
