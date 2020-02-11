import { Request, Response, NextFunction, response } from 'express';
import configuration from '../../config/configuration';
import * as jwt from 'jsonwebtoken';
import hasPermission from '../utils/permissions';
import UserRepository from '../../repositories/user/UserRepository';

const authMiddlerWare = (module: string, permission: string) => (req: Request, res: Response, next: NextFunction) => {
    console.log('----------------------AUTHMIDDLE WARE------------------');
    const userRepo = new UserRepository();
    try {
        const token: string = req.headers.authorization;
        const decodedPayload = jwt.verify(token, configuration.SECRECT_KEY);
        const decodedString = JSON.stringify(decodedPayload);
        const decodedJson = JSON.parse(decodedString);
        console.log(decodedPayload);
        if (!decodedPayload) {
            throw new Error('Unatuhorized Acess.');
        }

        const id: string = decodedJson.id;
        const email: string = decodedJson.email;
        if (userRepo.isExits(id, email)) {
            console.log('user already exits');
        } else {
            console.log('user doesnt exits');
            res.send('cant find user.');
        }

        if (!hasPermission(module, permission, decodedJson.role)) {
            throw new Error('Permission Denied.');
        }
        console.log('----------------AUTHENTIC AND ATHORIZED------------');
        next();
    } catch (err) {
        throw err;
    }
};

export default authMiddlerWare;