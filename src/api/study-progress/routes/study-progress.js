'use strict';

const auth = { auth: false, middlewares: ['global::is-authenticated'] };

module.exports = {
  routes: [
    { method: 'GET',  path: '/study-progresses',             handler: 'study-progress.find',   config: auth },
    { method: 'POST', path: '/study-progresses',             handler: 'study-progress.create', config: auth },
    { method: 'PUT',  path: '/study-progresses/:documentId', handler: 'study-progress.update', config: auth },
  ],
};
