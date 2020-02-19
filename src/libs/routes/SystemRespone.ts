import { Response, Request } from 'express';

class SystemRespone {
    success = (res: Response, Resquest: Request, message: string, status: number) => {
        res.send({
            message,
            status
        });
    }

    failure = (res: Response, Resquest: Request, error: Error , message: string, status: number) => {
        res.send({
            error,
            message,
            status
        });
    }
}

export default SystemRespone;