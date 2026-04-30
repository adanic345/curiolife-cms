'use strict';

const auth = { auth: false, middlewares: ['global::is-authenticated'] };

module.exports = {
  routes: [
    { method: 'GET',    path: '/prayer-logs',              handler: 'prayer-log.find',    config: auth },
    { method: 'GET',    path: '/prayer-logs/:documentId',  handler: 'prayer-log.findOne', config: auth },
    { method: 'POST',   path: '/prayer-logs',              handler: 'prayer-log.create',  config: auth },
    { method: 'DELETE', path: '/prayer-logs/:documentId',  handler: 'prayer-log.delete',  config: auth },
  ],
};
