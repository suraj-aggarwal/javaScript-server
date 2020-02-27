import { Response, NextFunction } from 'express';
import configuration from '../../config/configuration';
import * as jwt from 'jsonwebtoken';
import hasPermission from '../utils/permissions';
import { IRequest } from '../../libs/interface';
import SystemResponse from './SystemResponse';
import UserRepositroy from '../../repositories/user/UserRepository';

const authMiddlerWare = (module: string, permission: string) => (req: IRequest, res: Response, next: NextFunction) => {
    console.log('----------------------AUTHMIDDLE WARE------------------');
    try {
        const userRepo = new UserRepositroy();
        const systemResponse: SystemResponse = new SystemResponse();
        const token: string = req.headers.authorization;
        const decodedPayload: any = jwt.verify(token, configuration.SECRET_KEY);
        if (!decodedPayload) {
            systemResponse.failure(req, res, `Unauthorized Access`, 401, {error: `Authorization Failed`});
        }

        const {id, email} = decodedPayload;
        req.user = {userId: id, email};
        const isUserExists = userRepo.isExists(id, email);
        if (!isUserExists) {
            res.send({
                error: 'User does not exists',
                Stauts: 403,
                message: 'forbidden'
            });
        }
        if (!hasPermission(module, permission, decodedPayload.role)) {
            systemResponse.failure(req, res, `Permission Denied`, 403, {error: `Permission Denied`});
        }
        console.log('----------------AUTHENTIC AND ATHORIZED------------');
        next();
    } catch (err) {
        throw err;
    }
};



export default authMiddlerWare;