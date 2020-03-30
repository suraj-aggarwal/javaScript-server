import { Request, Response } from 'express';

class SystemResponse {
    public success(res: Response, message: string, code: number, resultSet: object) {
        return res.send({
            code,
            message,
            resultSet,
        });
    }

    public failure(res: Response, message: string, code: number, resultSet: object) {
        return res.send({
            code,
            error: resultSet,
            message
        });
    }
}

export default SystemResponse;