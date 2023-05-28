export default ({config}) => {
  return Object.assign(config,
    {
      extra: {
        backendUrl: process.env.BACKEND_URL || 'http://localhost:3000',
      },
      expo: {
        android: {
          config: {
            googleMaps: {
              apiKey: process.env.GOOGLE_KEY,
            },
          },
        }
      }
    });
};