module.exports = ({ env }) => ({
  // CKEditor Plugin Configuration
  ckeditor: {
    enabled: true,
  },

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
