'use strict';

const auth = { auth: false, middlewares: ['global::is-authenticated'] };

module.exports = {
  routes: [
    { method: 'GET', path: '/notifications',                        handler: 'notification.find',        config: auth },
    { method: 'PUT', path: '/notifications/read-all',               handler: 'notification.markAllRead', config: auth },
    { method: 'PUT', path: '/notifications/:documentId/read',       handler: 'notification.markRead',    config: auth },
  ],
};
