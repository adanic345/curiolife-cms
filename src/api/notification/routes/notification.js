'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/notifications',
      handler: 'notification.find',
      config: { policies: [] },
    },
    // Must come before /:documentId to avoid route shadowing
    {
      method: 'PUT',
      path: '/notifications/read-all',
      handler: 'notification.markAllRead',
      config: { policies: [] },
    },
    {
      method: 'PUT',
      path: '/notifications/:documentId/read',
      handler: 'notification.markRead',
      config: { policies: [] },
    },
  ],
};
