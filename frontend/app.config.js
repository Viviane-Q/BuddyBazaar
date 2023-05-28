export default ({ config }) => {
  return Object.assign(config,
    {
      expo: {
        ...config,
        extra: {
          backendUrl: process.env.BACKEND_URL || 'http://localhost:3000',
        },
        android: {
          ...config.android,
          config: {
            googleMaps: {
              apiKey: process.env.GOOGLE_KEY,
            },
          },
        }
      }
    });
};