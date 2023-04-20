const swaggerAutogen = require('swagger-autogen')();

const outputFile = 'swagger_output.json';
const endpointsFiles = ['src/adapters/driving/routes/router.js'];

swaggerAutogen(outputFile, endpointsFiles);
