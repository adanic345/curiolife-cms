'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/streaks/me',
      handler: 'streak.findMe',
      config: { policies: [] },
    },
  ],
};
