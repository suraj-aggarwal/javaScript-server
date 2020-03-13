import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';
import { Request, Response } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import { IRequest } from '../../libs/interface';
import SystemResponse from '../../libs/routes/SystemResponse';
import configuration from '../../config/configuration';

class UserController {
  static instance: UserController;
  private systemResponse: SystemResponse = new SystemResponse();
  static getInstance(): UserController {
    if (UserController.instance instanceof UserController) {
      return UserController.instance;
    }
    return (UserController.instance = new UserController());
  }
  private constructor() {}

  private userRepo = new UserRepository();

  login = async (req: IRequest, res: Response): Promise<void> => {
    const email = req.body.email;
    const password = req.body.password;
    const doc = await this.userRepo.get({ email });
    const { role } = doc;
    if (doc !== null) {
      const match = await bcrypt.compare(password, doc.password);
      console.log('--------Match-------', password, doc.password, match);
      if (!match) {
        this.systemResponse.failure(req, res, `Invalid password`, 400, {message: 'entered wrong pasword'});
      }
      const id = doc.originalId;
      const token = jwt.sign({ id, email, role }, config.SECRET_KEY);
      this.systemResponse.success(req, res, `User Profile`, 200, {token});
    } else {
      this.systemResponse.success(req, res, `Invalid User`, 500, {message: 'falied to login'});
    }
  };
  userProfile = (req: Request, res: Response): void => {
    const token: string = req.headers.authorization;
    const decodedPayload: any = jwt.verify(token, configuration.SECRET_KEY);
    const { id } = decodedPayload;
    console.log(decodedPayload);
    this.userRepo
      .profile(id)
      .then(profile => {
        console.log('--------user Profile----------', profile);
        this.systemResponse.success(req, res, `User Profile`, 200, profile);
      })
      .catch(err => {
        this.systemResponse.failure(req, res, 'No Such userExits', 500, err);
      });
  };

  isExists = (id: string, email: string): boolean => {
    this.userRepo
      .isExists(id, email)
      .then(permission => {
        console.log('-----------------permissions-----------', permission);
        return permission;
      })
      .catch(err => {
        return false;
      });
    return false;
  };
}

export default UserController.getInstance();
