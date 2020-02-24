import { Request, Response, NextFunction }  from 'express';

const errorHandler = (errs, req: Request, res: Response, next: NextFunction) => {
    console.log('------------ERROR HANDLER--------------');
    const errorlogs = [];
    if (Array.isArray(errs)) {
        errs.forEach( err => {
            errorlogs.push({
                error : err,
                message : 'error',
                status : 500,
                timeStamp : new Date()
            });
        });
        res.send(errorlogs);
    } else {
        res.send({
            error : errs.message,
            message : 'error',
            status : 500,
            timeStamp : new Date()
        });
    }
};

export default errorHandler;
