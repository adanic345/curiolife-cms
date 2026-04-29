'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/study-progresses',
      handler: 'study-progress.find',
      config: { policies: [] },
    },
    {
      method: 'POST',
      path: '/study-progresses',
      handler: 'study-progress.create',
      config: { policies: [] },
    },
    {
      method: 'PUT',
      path: '/study-progresses/:documentId',
      handler: 'study-progress.update',
      config: { policies: [] },
    },
  ],
};
