'use strict';

const auth = { auth: false, middlewares: ['global::is-authenticated'] };

module.exports = {
  routes: [
    { method: 'GET',  path: '/devotional-progresses',             handler: 'devotional-progress.find',   config: auth },
    { method: 'POST', path: '/devotional-progresses',             handler: 'devotional-progress.create', config: auth },
    { method: 'PUT',  path: '/devotional-progresses/:documentId', handler: 'devotional-progress.update', config: auth },
  ],
};
