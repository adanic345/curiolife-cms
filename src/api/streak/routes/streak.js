'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/streaks/me',
      handler: 'streak.findMe',
      config: { auth: false, middlewares: ['global::is-authenticated'] },
    },
  ],
};
