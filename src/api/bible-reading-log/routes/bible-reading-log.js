'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/bible-reading-logs',
      handler: 'bible-reading-log.find',
      config: { policies: [] },
    },
    {
      method: 'POST',
      path: '/bible-reading-logs',
      handler: 'bible-reading-log.create',
      config: { policies: [] },
    },
  ],
};
