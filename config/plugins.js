module.exports = ({ env }) => ({
  // GraphQL Plugin Configuration
  graphql: {
    enabled: true,
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: env('NODE_ENV') === 'development',
      depthLimit: 10,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },

  // Documentation Plugin Configuration
  documentation: {
    enabled: true,
    config: {
      restrictedAccess: false,
      openapi: '3.0.0',
    },
  },
});
