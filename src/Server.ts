import * as express from 'express';
import * as bodyParser from 'body-parser';
import notFoundRoutes from './libs/routes/notFoundRoutes';
import errorHandler from './libs/routes/errorHandler';
import mainRoute from './router';
import Database from './libs/Database';
import { swaggerSpecs } from './libs/constants';
import * as swaggerUi from 'swagger-ui-express';

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
    app.get('/swagger.json', (req: express.Request, res: express.Response) => {
      res.setHeader('Content-type', 'application/json');
      res.send(swaggerSpecs);
    });
    app.use('/api', mainRoute);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
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
