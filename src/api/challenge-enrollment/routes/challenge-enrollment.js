'use strict';

const auth = { auth: false, middlewares: ['global::is-authenticated'] };

module.exports = {
  routes: [
    { method: 'GET',    path: '/challenge-enrollments',             handler: 'challenge-enrollment.find',   config: auth },
    { method: 'POST',   path: '/challenge-enrollments',             handler: 'challenge-enrollment.create', config: auth },
    { method: 'PUT',    path: '/challenge-enrollments/:documentId', handler: 'challenge-enrollment.update', config: auth },
    { method: 'DELETE', path: '/challenge-enrollments/:documentId', handler: 'challenge-enrollment.delete', config: auth },
  ],
};
