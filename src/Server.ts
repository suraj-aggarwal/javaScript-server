import * as express from 'express';
class Server {

    private app: express.Application;
    constructor(private config) {
        this.app = express();
    }

    bootstrap = () => {
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
            console.log('I am OK');
            res.send('I am ok.');
        });
        return this;
    }
}

export default Server;