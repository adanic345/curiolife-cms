'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/devotional-progresses',
      handler: 'devotional-progress.find',
      config: { policies: [] },
    },
    {
      method: 'POST',
      path: '/devotional-progresses',
      handler: 'devotional-progress.create',
      config: { policies: [] },
    },
    {
      method: 'PUT',
      path: '/devotional-progresses/:documentId',
      handler: 'devotional-progress.update',
      config: { policies: [] },
    },
  ],
};
