'use strict';

const auth = { auth: false, middlewares: ['global::is-authenticated'] };

module.exports = {
  routes: [
    { method: 'GET',  path: '/bible-reading-logs', handler: 'bible-reading-log.find',   config: auth },
    { method: 'POST', path: '/bible-reading-logs', handler: 'bible-reading-log.create', config: auth },
  ],
};
