import * as express from 'express';
import * as  bodyParser from 'body-parser';
import notFoundRoutes from './libs/routes/notFoundRoutes';
import errorHandler from './libs/routes/errorHandler';
import mainRoute from './router';
import validate from './libs/routes/validationHandler';


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
        const { app, config: { PORT } }: Server = this;
        app.listen(PORT, (err) => {
            if (err) {
                console.log('error');
            } else {
                console.log('server is running at port ', PORT);
            }

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