import { Ipermissions, Iuser } from './interface';
import * as swaggerJSDoc from 'swagger-jsdoc';

const permissions: Ipermissions = {
    getUsers : {
        all: ['head-trainer'],
        read: ['trainer', 'trainee'],
        write: ['trainer'],
        delete: []
    }
};

const users: Iuser[] = [
    {
        traineeName: 'suraj.aggarwal@succesive.tech',
        reviewerName: 'madhav.bansal@successive.tech'
    },
    {
        traineeName: 'anjali.shah@successive.tech',
        reviewerName: 'pooja.thapa@successive.tech'
    }
];

const swaggerDefinition = {
    info: {
      title: 'Example trainee API with swagger', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'Endpoints to test routes in api' // description(required)
    },
    host: 'localhost:9000',
    basePath: '/api',
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'Headers'
      },
    },  // Path to the API docs
  };

  const options = {
    swaggerDefinition,
    apis: ['dist/controllers/**/routes.js', 'dist/repositories/user/UserSchema.js'],
  };

  const swaggerSpecs = swaggerJSDoc(options);

export { permissions, users, swaggerSpecs };
