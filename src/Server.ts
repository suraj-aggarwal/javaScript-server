import * as express from 'express';
import * as  bodyParser from 'body-parser';
import notFoundRoutes from './libs/routes/notFoundRoutes';
import errorHandler from './libs/routes/errorHandler';
class Server {

    private app: express.Application;
    constructor(private config) {
        this.app = express();
    }

    bootstrap = () => {
        this.initBodyParser();
        this.setupRoutes();
        return this;
    }

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
            res.send('I am Ok');
        });
        app.use(notFoundRoutes);
        app.use(errorHandler);
        return this;
    }

    initBodyParser = () => {
        const { app } = this;
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        return this;
    }
}

export default Server;