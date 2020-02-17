import { Request, Response, NextFunction, response } from 'express';
import configuration from '../../config/configuration';
import * as jwt from 'jsonwebtoken';
import hasPermission from '../utils/permissions';
import UserRepository from '../../repositories/user/UserRepository';
import { IRequest } from '../interface';
import { ConnectionStates } from 'mongoose';

const authMiddlerWare = (module: string, permission: string) => (req: IRequest, res: Response, next: NextFunction) => {
    console.log('----------------------AUTHMIDDLE WARE------------------');
    const userRepo = new UserRepository();
    try {
        const token: string = req.headers.authorization;
        const decodedPayload = jwt.verify(token, configuration.SECRECT_KEY);
        const decodedString = JSON.stringify(decodedPayload);
        const decodedJson = JSON.parse(decodedString);
        if (!decodedPayload) {
            return res.status(500).send('Unatuhorized Acess.');
        }

        const { id, email} = decodedJson;
        console.log(decodedJson);
        const user = {
            _authId : id,
            email
        };

        req.user = user;
        console.log(req.user);

        if (userRepo.isExits(id, email)) {
            console.log('user already exits');
        } else {
            console.log('user doesnt exits');
            return res.status(500).send('cant find user.');
        }

        if (!hasPermission(module, permission, decodedJson.role)) {
            return res.status(500).send('Permission Denied.');
        }
        console.log('----------------AUTHENTIC AND ATHORIZED------------');
         return next();
    } catch (err) {
        throw err;
    }
};

export default authMiddlerWare;