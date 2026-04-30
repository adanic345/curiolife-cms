'use strict';

const AUTHENTICATED_PERMISSIONS = [
  // Content — read only
  'api::prayer.prayer.find',
  'api::prayer.prayer.findOne',
  'api::devotional.devotional.find',
  'api::devotional.devotional.findOne',
  'api::study.study.find',
  'api::study.study.findOne',
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

  // Me
  'api::me.me.find',
  'api::me.me.update',
];

async function ensureAuthenticatedPermissions(strapi) {
  // Use strapi.db.query for reliable relation handling in Strapi 5
  const authenticatedRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'authenticated' } });

  if (!authenticatedRole) {
    strapi.log.warn('[permissions] authenticated role not found — skipping');
    return;
  }

  strapi.log.info(`[permissions] authenticated role id: ${authenticatedRole.id}`);

  const existing = await strapi.db
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: { id: authenticatedRole.id } } });

  const existingActions = new Set(existing.map((p) => p.action));
  strapi.log.info(`[permissions] ${existingActions.size} permissions already on authenticated role`);

  const toCreate = AUTHENTICATED_PERMISSIONS.filter((a) => !existingActions.has(a));

  if (toCreate.length === 0) {
    strapi.log.info('[permissions] all permissions already present');
    return;
  }

  strapi.log.info(`[permissions] granting ${toCreate.length} missing permission(s): ${toCreate.join(', ')}`);

  await Promise.all(
    toCreate.map((action) =>
      strapi.db.query('plugin::users-permissions.permission').create({
        data: { action, role: authenticatedRole.id },
      })
    )
  );

  strapi.log.info('[permissions] done');
}

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    await ensureAuthenticatedPermissions(strapi);
  },
};
