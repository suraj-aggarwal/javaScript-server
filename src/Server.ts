import * as express from 'express';
import * as bodyParser from 'body-parser';
import notFoundRoutes from './libs/routes/notFoundRoutes';
import errorHandler from './libs/routes/errorHandler';
import mainRoute from './router';
import Database from './libs/Database';
import * as swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
      swagger: '2.0', // Specification (optional, defaults to swagger: '2.0')
      basePath: '/api',
      info: {
        title: 'Example trainee API with swagger', // Title (required)
        version: '1.0.0', // Version (required)
      },
    },
    securityDefinitions: {
        Bearer: { in: 'Headers', name: 'Authorization', type: 'apiKey' }
    },
    // Path to the API docs
    apis: ['dist/controllers/**/routes.js'],
    url: 'localhost:9000'
};

  const specs = swaggerJSDoc(options);

class Server {
  private app: express.Application;
  constructor(private config) {
    this.app = express();
  }

  bootstrap = (): Server => {
    this.initBodyParser();
    this.setupRoutes();
    return this;
  };

  run = (): Server => {
    const {
      app,
      config: { PORT, MONGO_URL: uri }
    }: Server = this;
    Database.open(uri)
      .then(success => {
        console.log(success);
        app.listen(PORT, err => {
          if (err) {
            throw new Error('Failed to run app');
          } else {
            console.log(`App successfully started at port ${PORT}`);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
    return this;
  };

  setupRoutes = (): void => {
    const { app } = this;
    app.use('/health-check', (req: express.Request, res: express.Response) => {
      console.log(req.body);
      res.send('I am Ok');
    });
    app.use('/api', mainRoute);
    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(specs));
    app.use(notFoundRoutes);
    app.use(errorHandler);
  };

  initBodyParser = (): void => {
    console.log('-----------------BODY PARSER-------------------------');
    const { app } = this;
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  };
}

export default Server;
