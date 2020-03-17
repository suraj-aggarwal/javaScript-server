import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  errs,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorlogs = [];
  if (Array.isArray(errs)) {
    errs.forEach(err => {
      errorlogs.push({
        error: err,
        message: 'error',
        status: 500,
        timeStamp: new Date()
      });
    });
    return res.send(errorlogs);
  } else {
    res.send({
      error: errs.message,
      message: 'error',
      status: 404,
      timeStamp: new Date()
    });
  }
};

export default errorHandler;
