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
  private constructor() { }

  private userRepo: UserRepository = new UserRepository();

  login = async (req: IRequest, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const doc = await this.userRepo.get({ email });
      if (doc) {
        const match = await bcrypt.compare(password, doc.password);
        if (!match) {
          return this.systemResponse.failure(res, 'Invalid Password', 500, {
            message: 'Enter correct password'
          });
        }
        const { id, role } = doc || {};
        const token = jwt.sign({ id, email, role }, config.SECRET_KEY);
        return this.systemResponse.success(res, 'Authorized User', 200, {
          message: 'ok',
          tokenString: token
        });
      }
      return this.systemResponse.failure(res, `Invalid email`, 403, {
        message: 'make sure to add @successive.tech or user not exits any more'
      });
    } catch (err) {
      return this.systemResponse.failure(res, 'failed to login in', 500, {
        message: 'Server error'
      });
    }
  };

  userProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
      const token: string = req.headers.authorization;
      const decodedPayload: any = jwt.verify(token, configuration.SECRET_KEY);
      const { id } = decodedPayload;
      const profile = await this.userRepo.get({ id });
      if (profile) {
        delete profile['_id'];
        return this.systemResponse.success(res, `User Profile`, 200, profile);
      }
      return this.systemResponse.failure(res, `User Profile not exists`, 403, profile);

    } catch (err) {
      return this.systemResponse.failure(res, 'failed to fetch profile', 500, err);
    }
  };
}

export default UserController.getInstance();
