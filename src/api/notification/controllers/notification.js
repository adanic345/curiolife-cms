'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::notification.notification', () => ({
  async find(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    ctx.query = {
      ...ctx.query,
      filters: { ...ctx.query.filters, user: { id: userId } },
      sort: ['createdAt:desc'],
    };
    return super.find(ctx);
  },

  // PUT /notifications/:documentId/read
  async markRead(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const entry = await strapi.documents('api::notification.notification').findOne({
      documentId: ctx.params.documentId,
      populate: ['user'],
    });

    if (!entry || entry.user?.id !== userId) return ctx.forbidden();

    const updated = await strapi.documents('api::notification.notification').update({
      documentId: ctx.params.documentId,
      data: { isRead: true },
    });

    return { data: updated };
  },

  // PUT /notifications/read-all
  async markAllRead(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const unread = await strapi.documents('api::notification.notification').findMany({
      filters: { user: { id: userId }, isRead: { $eq: false } },
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
