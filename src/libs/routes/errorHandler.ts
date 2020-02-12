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
        console.log('array of errors', errorlogs);
        res.send(errorlogs);
    } else {
        console.log('single error', errorlogs);
        res.send(errs);
    }
};

export default errorHandler;
