import *  as express from 'express';

const errorHandler = (err, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errorMessage = {
        error: err.message,
        message: 'error',
        status: 500,
        timestamp: new Date()
    };
    res.send(errorMessage);
};

export default errorHandler;
