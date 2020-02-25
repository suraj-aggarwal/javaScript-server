import * as express from 'express';
import * as  bodyParser from 'body-parser';
import notFoundRoutes from './libs/routes/notFoundRoutes';
import errorHandler from './libs/routes/errorHandler';
import mainRoute from './router';
import Database from './libs/Database';
import swaggerSpecs from './api-docs';
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
    }

    run = (): Server => {
        const { app, config: { PORT, MONGO_URL: connectionUrl } }: Server = this;
        Database.open(connectionUrl).then(() => {
            app.listen(PORT, err => {
                if (err) {
                    console.log('failed to fun app');
                    throw new Error('failed to run app.');
                } else {
                    console.log(`App successfully started at port ${PORT}`);
                }
            });
        });
        return this;
    }

    setupRoutes = (): Server => {

        const { app } = this;
        app.use('/health-check', (req: express.Request, res: express.Response) => {
            console.log(req.body);
            res.send('I am Ok');
        });
        app.use('/api', mainRoute);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
        app.use(notFoundRoutes);
        app.use(errorHandler);
        return this;
    }

    initBodyParser = (): void => {
        console.log('-----------------BODY PARSER-------------------------');
        const { app } = this;
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    }
}

export default Server;