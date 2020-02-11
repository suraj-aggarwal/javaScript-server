import * as express from 'express';
<<<<<<< Updated upstream
import * as  bodyParser from 'body-parser';
import notFoundRoutes from './libs/routes/notFoundRoutes';
import errorHandler from './libs/routes/errorHandler';
import mainRoute from './router';
import Database from './libs/Database';


class Server {
=======
class Server {

>>>>>>> Stashed changes
    private app: express.Application;
    constructor(private config) {
        this.app = express();
    }

<<<<<<< Updated upstream
    bootstrap = (): Server => {
        this.initBodyParser();
=======
    bootstrap = () => {
>>>>>>> Stashed changes
        this.setupRoutes();
        return this;
    }

<<<<<<< Updated upstream
    run = (): Server => {
        const { app, config: { PORT , MONGO_URL: connectionUrl} }: Server = this;
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
        return  this;
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
=======
    run = () => {
        const { app, config: { PORT } } = this;
        app.listen(PORT, (err) => {
            if (err) {
                console.log('Not found.');
            }
            console.log('sucessfull');
        });
        return this;
    }

    setupRoutes = () => {
        const { app } = this;
        app.use('/health-check', (req, res) => {
            console.log('I am OK');
            res.send('I am ok.');
        });
        return this;
>>>>>>> Stashed changes
    }
}

export default Server;