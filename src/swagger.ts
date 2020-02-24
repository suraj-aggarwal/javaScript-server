import * as swaggerJsDoc from 'swagger-jsdoc';
const options = {
    definition: {
      info: {
        swagger: '2.0',
        openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0'
        title: 'Trainee API', // Title (required)
        version: '1.0.0', // Version (required)
      },
    },
    // Path to the API docs
    servers: ['https://localhost:9000'],
    apis: ['./dist/swagger.js', './dist/controllers/trainee/routes.js'],
  };
  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  const swaggerSpecs = swaggerJsDoc(options);
  export default swaggerSpecs;