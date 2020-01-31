import *  as express from 'express';
const notFoundRoutes = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const err = new Error('Not Found');
    next(err);
};

export default notFoundRoutes;