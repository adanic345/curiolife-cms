'use strict';

// Explicit allowlist of user fields the client is permitted to update.
// spiritualGoals is JSON — Strapi's built-in user update sanitizes it out,
// which is why onboarding data was silently dropped.
const ALLOWED_FIELDS = [
  'firstName',
  'lastName',
  'preferredTranslation',
  'notificationsEnabled',
  'dailyReminderTime',
  'spiritualGoals',
];

module.exports = {
  // GET /api/me
  async find(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const user = await strapi.documents('plugin::users-permissions.user').findOne({
      documentId: ctx.state.user.documentId,
      populate: ['avatar'],
    });

    if (!user) return ctx.notFound();

    // Strip private fields before returning
    const { password, resetPasswordToken, confirmationToken, ...safe } = user;
    return { data: safe };
  },

  // PUT /api/me
  async update(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const body = ctx.request.body?.data ?? ctx.request.body ?? {};

    // Only pick allowed fields — reject anything else silently
    const data = {};
    for (const field of ALLOWED_FIELDS) {
      if (field in body) {
        data[field] = body[field];
      }
    }

    if (Object.keys(data).length === 0) {
      return ctx.badRequest('No valid fields provided');
    }

    const updated = await strapi.documents('plugin::users-permissions.user').update({
      documentId: ctx.state.user.documentId,
      data,
      populate: ['avatar'],
    });

    const { password, resetPasswordToken, confirmationToken, ...safe } = updated;
    return { data: safe };
  },
};
