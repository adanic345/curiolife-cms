'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::notification.notification', () => ({
  async find(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const now = new Date().toISOString();

    const entries = await strapi.documents('api::notification.notification').findMany({
      filters: {
        $and: [
          {
            $or: [
              { scheduledAt: { $null: true } },
              { scheduledAt: { $lte: now } },
            ],
          },
          {
            $or: [
              { user: { id: { $eq: userId } } },
              { broadcast: { $eq: true } },
            ],
          },
        ],
      },
      sort: ['createdAt:desc'],
    });

    return { data: entries };
  },

  async markRead(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const entry = await strapi.documents('api::notification.notification').findOne({
      documentId: ctx.params.documentId,
      populate: ['user'],
    });

    if (!entry) return ctx.notFound();
    if (!entry.broadcast && entry.user?.id !== userId) return ctx.forbidden();

    const updated = await strapi.documents('api::notification.notification').update({
      documentId: ctx.params.documentId,
      data: { isRead: true },
    });

    return { data: updated };
  },

  async markAllRead(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const now = new Date().toISOString();

    const unread = await strapi.documents('api::notification.notification').findMany({
      filters: {
        $and: [
          { isRead: { $eq: false } },
          {
            $or: [
              { scheduledAt: { $null: true } },
              { scheduledAt: { $lte: now } },
            ],
          },
          {
            $or: [
              { user: { id: { $eq: userId } } },
              { broadcast: { $eq: true } },
            ],
          },
        ],
      },
    });

    await Promise.all(
      unread.map((n) =>
        strapi.documents('api::notification.notification').update({
          documentId: n.documentId,
          data: { isRead: true },
        })
      )
    );

    return { data: { updated: unread.length } };
  },
}));
