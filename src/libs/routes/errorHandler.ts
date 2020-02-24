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
        return res.send(errorlogs);
    } else {
<<<<<<< HEAD
        return res.send({
            error: error.message,
=======
        res.send({
            error : errs.message,
>>>>>>> be8cb4ec034b2ffa545c2e0c6bed4276ab9a5459
            message : 'error',
            status : 500,
            timeStamp : new Date()
        });
    }
};

export default errorHandler;
