export default ({config}) => {
  return Object.assign(config,
    {
      extra: {
        backendUrl: process.env.BACKEND_URL || 'http://localhost:3000',
      }
    });
};