import { Request, Response, NextFunction }  from 'express';

const errorHandler = (err, req: Request, res: Response, next: NextFunction) => {
    const errorMessage = {
        error: err.message,
        message: 'error',
        status: 500,
        timestamp: new Date()
    };
    res.send(errorMessage);
};

export default errorHandler;
