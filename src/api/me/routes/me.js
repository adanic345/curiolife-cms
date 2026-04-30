'use strict';

const auth = { auth: false, middlewares: ['global::is-authenticated'] };

module.exports = {
  routes: [
    { method: 'GET', path: '/me', handler: 'me.find',   config: auth },
    { method: 'PUT', path: '/me', handler: 'me.update', config: auth },
  ],
};
