'use strict';

// Permissions that must exist for the `authenticated` role.
// Bootstrap ensures these are present on every startup — idempotent, safe to re-run.
const AUTHENTICATED_PERMISSIONS = [
  // Prayer
  'api::prayer.prayer.find',
  'api::prayer.prayer.findOne',

  // Devotional
  'api::devotional.devotional.find',
  'api::devotional.devotional.findOne',

  // Study
  'api::study.study.find',
  'api::study.study.findOne',

  // Challenge
  'api::challenge.challenge.find',
  'api::challenge.challenge.findOne',

  // Prayer Log
  'api::prayer-log.prayer-log.find',
  'api::prayer-log.prayer-log.findOne',
  'api::prayer-log.prayer-log.create',
  'api::prayer-log.prayer-log.delete',

  // Devotional Progress
  'api::devotional-progress.devotional-progress.find',
  'api::devotional-progress.devotional-progress.create',
  'api::devotional-progress.devotional-progress.update',

  // Study Progress
  'api::study-progress.study-progress.find',
  'api::study-progress.study-progress.create',
  'api::study-progress.study-progress.update',

  // Streak
  'api::streak.streak.findMe',

  // Notifications
  'api::notification.notification.find',
  'api::notification.notification.markRead',
  'api::notification.notification.markAllRead',

  // Challenge Enrollment
  'api::challenge-enrollment.challenge-enrollment.find',
  'api::challenge-enrollment.challenge-enrollment.create',
  'api::challenge-enrollment.challenge-enrollment.update',
  'api::challenge-enrollment.challenge-enrollment.delete',

  // Bible Reading Log
  'api::bible-reading-log.bible-reading-log.find',
  'api::bible-reading-log.bible-reading-log.create',
];

async function ensureAuthenticatedPermissions(strapi) {
  const authenticatedRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'authenticated' } });

  if (!authenticatedRole) {
    strapi.log.warn('Could not find authenticated role — skipping permission bootstrap');
    return;
  }

  const existing = await strapi
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: authenticatedRole.id } });

  const existingActions = new Set(existing.map((p) => p.action));

  const toCreate = AUTHENTICATED_PERMISSIONS.filter((action) => !existingActions.has(action));

  if (toCreate.length === 0) {
    strapi.log.info('Authenticated permissions already up to date');
    return;
  }

  await Promise.all(
    toCreate.map((action) =>
      strapi.query('plugin::users-permissions.permission').create({
        data: { action, role: authenticatedRole.id },
      })
    )
  );

  strapi.log.info(`Granted ${toCreate.length} permission(s) to authenticated role: ${toCreate.join(', ')}`);
}

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    await ensureAuthenticatedPermissions(strapi);
  },
};
