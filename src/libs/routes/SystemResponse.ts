import { Request, Response } from 'express';

class SystemResponse {
    public success(req: Request, res: Response, message: string, code: number, resultSet: object) {
        res.send({
            code,
            message,
            resultSet,
        });
    }

    public failure(req: Request, res: Response, message: string, code: number, resultSet: object) {
        res.send({
            code,
            error: resultSet,
            message
        });
    }
}

export default SystemResponse;