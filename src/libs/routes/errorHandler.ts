import { Request, Response, NextFunction }  from 'express';

const errorHandler = (error, req: Request, res: Response, next: NextFunction) => {
    console.log('------------ERROR HANDLER--------------');
    console.log(error);
    if (Array.isArray(error)) {
        const errorlogs: object[] = [];
        error.forEach( err => {
            errorlogs.push({
                error : err,
                message : 'error',
                status : 500,
                timeStamp : new Date()
            });
        });
        return res.send(errorlogs);
    } else {
        return res.send({
            error: error.message,
            message : 'error',
            status : 500,
            timeStamp : new Date()
        });
    }
};

export default errorHandler;
