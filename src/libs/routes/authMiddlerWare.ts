import { Request, Response, NextFunction } from 'express';
import configuration from '../../config/configuration';
import * as jwt from 'jsonwebtoken';
import hasPermission from '../utils/permissions';

const authMiddlerWare = (module: string, permission: string) => (req: Request, res: Response, next: NextFunction) => {
    console.log('----------------------AUTHMIDDLE WARE------------------');
    try {
        const token: string = req.headers.authorization;
        const decodedPayload = jwt.verify(token, configuration.SECRECT_KEY);
        const decodedString = JSON.stringify(decodedPayload);
        const decodedJson = JSON.parse(decodedString);
        console.log(decodedPayload);
        if (!decodedPayload) {
            res.send(
            {   error : 'Unatuhorized Acess.',
                Stauts: 401,
                message: 'Unatuhorized Acess.'
        });
        }
        if (!hasPermission(module, permission, decodedJson.role)) {
            res.send(
                {   error : 'Permission Denied.',
                    Stauts: 403,
                    message: 'Permission Denied.'
            });
        }
    console.log('----------------AUTHENTIC AND ATHORIZED------------');
        next();
    } catch (err) {
        throw err;
    }
};

export default authMiddlerWare;