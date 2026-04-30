'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/challenge-enrollments',
      handler: 'challenge-enrollment.find',
      config: { policies: [] },
    },
    {
      method: 'POST',
      path: '/challenge-enrollments',
      handler: 'challenge-enrollment.create',
      config: { policies: [] },
    },
    {
      method: 'PUT',
      path: '/challenge-enrollments/:documentId',
      handler: 'challenge-enrollment.update',
      config: { policies: [] },
    },
    {
      method: 'DELETE',
      path: '/challenge-enrollments/:documentId',
      handler: 'challenge-enrollment.delete',
      config: { policies: [] },
    },
  ],
};
