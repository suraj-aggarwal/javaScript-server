import { Request, Response, NextFunction } from 'express';
import configuration from '../../config/configuration';
import * as jwt from 'jsonwebtoken';
import hasPermission from '../utils/permissions';
import UserRepository from '../../repositories/user/UserRepository';

const authMiddlerWare = (module: string, permission: string) => (req: Request, res: Response, next: NextFunction) => {
    console.log('----------------------AUTHMIDDLE WARE------------------');
    const userRepo = new UserRepository();
    try {
        const token: string = req.headers.authorization;
        const decodedPayload: any = jwt.verify(token, configuration.SECRET_KEY);
        console.log('decodedPayload-------', decodedPayload);
        if (!decodedPayload) {
            res.send(
            {   error : 'Unatuhorized Acess.',
                Stauts: 401,
                message: 'Unatuhorized Acess.'
        });
        }

        if (!hasPermission(module, permission, decodedPayload.role)) {
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