'use strict';

// Permissions for the authenticated role on core-router APIs.
// Custom-route APIs (prayer-log, streak, etc.) are protected by the
// global::is-authenticated middleware and don't need entries here.
const AUTHENTICATED_PERMISSIONS = [
  'api::prayer.prayer.find',
  'api::prayer.prayer.findOne',
  'api::devotional.devotional.find',
  'api::devotional.devotional.findOne',
  'api::study.study.find',
  'api::study.study.findOne',
  'api::challenge.challenge.find',
  'api::challenge.challenge.findOne',
];

async function ensureAuthenticatedPermissions(strapi) {
  const authenticatedRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'authenticated' } });

  if (!authenticatedRole) return;

  const existing = await strapi.db
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: { id: authenticatedRole.id } } });

  const existingActions = new Set(existing.map((p) => p.action));
  const toCreate = AUTHENTICATED_PERMISSIONS.filter((a) => !existingActions.has(a));

  if (toCreate.length === 0) return;

  await Promise.all(
    toCreate.map((action) =>
      strapi.db.query('plugin::users-permissions.permission').create({
        data: { action, role: authenticatedRole.id },
      })
    )
  );
}

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    await ensureAuthenticatedPermissions(strapi);
  },
};
