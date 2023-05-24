export default ({config}) => {
  return Object.assign(config,
    {
      extra: {
        backendUrl: process.env.BACKEND_URL || 'http://localhost:3000',
        googleKey: process.env.GOOGLE_KEY || 'GOOGLE_KEY',
      }
    });
};