'use strict';

// Validates a JWT, sets ctx.state.user, and strips the `user` field from
// the request body so the sanitizer never sees it — our controllers always
// force user to ctx.state.user.id server-side.
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

    // Strip `user` from body so Strapi's sanitizer doesn't reject it
    if (ctx.request.body?.data && typeof ctx.request.body.data === 'object') {
      delete ctx.request.body.data.user;
    }

    return next();
  } catch {
    return ctx.unauthorized('Invalid or expired token');
  }
};
