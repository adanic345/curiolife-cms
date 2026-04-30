'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/me',
      handler: 'me.find',
      config: { policies: [] },
    },
    {
      method: 'PUT',
      path: '/me',
      handler: 'me.update',
      config: { policies: [] },
    },
  ],
};
