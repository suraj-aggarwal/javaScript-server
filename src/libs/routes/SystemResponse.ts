import { Request, Response } from 'express';

class SystemResponse {
    public async success(req: Request, res: Response, message: string, code: number, resultSet: object) {
        res.send({
            code,
            message,
            resultSet,
        });
    }

    public async failure(req: Request, res: Response, message: string, code: number, resultSet: object) {
        res.send({
            code,
            error: resultSet,
            message
        });
    }
}

export default SystemResponse;