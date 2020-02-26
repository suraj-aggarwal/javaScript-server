import { Request, Response, NextFunction } from 'express';
import configuration from '../../config/configuration';
import * as jwt from 'jsonwebtoken';
import hasPermission from '../utils/permissions';
import UserRepository from '../../repositories/user/UserRepository';
import { IRequest } from '../interface';

const authMiddlerWare = (module: string, permission: string) => (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  console.log('----------------------AUTHMIDDLE WARE------------------');
  try {
    const userRepo: UserRepository = new UserRepository();
    const token: string = req.headers.authorization;
    const decodedPayload: any = jwt.verify(token, configuration.SECRET_KEY);
    if (!decodedPayload) {
      res.send({
        error: 'Unauthorized Access.',
        Stauts: 401,
        message: 'Unauthorized Access.'
      });
    }

    const { id, email } = decodedPayload;
    const isUserExists = userRepo.isExists(id, email);
    if (!isUserExists) {
      res.send({
        error: 'User does not exists',
        Stauts: 403,
        message: 'forbidden'
      });
    }
    if (!hasPermission(module, permission, decodedPayload.role)) {
      res.send({
        error: 'Permission Denied.',
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
