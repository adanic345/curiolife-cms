'use strict';

// Custom middleware that validates a JWT and populates ctx.state.user
// without going through the users-permissions action registry.
// Apply to any route with: auth: false, middlewares: ['global::is-authenticated']
module.exports = (config, { strapi }) => async (ctx, next) => {
  const authHeader = ctx.request.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return ctx.unauthorized('Authentication token required');
  }

  const token = authHeader.slice(7);

  try {
    const { id } = await strapi
      .plugin('users-permissions')
      .service('jwt')
      .verify(token);

    const user = await strapi.db
      .query('plugin::users-permissions.user')
      .findOne({ where: { id } });

    if (!user || !user.confirmed || user.blocked) {
      return ctx.unauthorized('Invalid or inactive account');
    }

    ctx.state.user = user;
    return next();
  } catch {
    return ctx.unauthorized('Invalid or expired token');
  }
};
