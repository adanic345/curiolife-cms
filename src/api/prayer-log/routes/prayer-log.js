'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/prayer-logs',
      handler: 'prayer-log.find',
      config: { policies: [] },
    },
    {
      method: 'POST',
      path: '/prayer-logs',
      handler: 'prayer-log.create',
      config: { policies: [] },
    },
    {
      method: 'GET',
      path: '/prayer-logs/:documentId',
      handler: 'prayer-log.findOne',
      config: { policies: [] },
    },
    {
      method: 'DELETE',
      path: '/prayer-logs/:documentId',
      handler: 'prayer-log.delete',
      config: { policies: [] },
    },
  ],
};
