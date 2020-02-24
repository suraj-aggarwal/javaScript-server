import { Request, Response, NextFunction } from 'express';
import configuration from '../../config/configuration';
import * as jwt from 'jsonwebtoken';
import hasPermission from '../utils/permissions';
import UserRepository from '../../repositories/user/UserRepository';

const authMiddlerWare = (module: string, permission: string) => (req: Request, res: Response, next: NextFunction) => {
    console.log('----------------------AUTHMIDDLE WARE------------------');
    try {
        const token: string = req.headers.authorization;
        const decodedPayload: any = jwt.verify(token, configuration.SECRET_KEY);
        const {id, email} = decodedPayload;
        const exits = isExits(id, email);
        if (!decodedPayload) {
            res.send(
            {   error : 'Unauthorized Access.',
                Stauts: 401,
                message: 'Unauthorized Access.'
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

const isExits = (id: string, email: string) => {
    console.log('----------------Is Exits----------------');
    const userRepo: UserRepository = new UserRepository();
    return userRepo.isExits(id, email);
};

export default authMiddlerWare;