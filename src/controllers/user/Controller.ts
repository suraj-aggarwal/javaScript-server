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
    try{
      const email = req.body.email;
      const password = req.body.password;
      const doc = await this.userRepo.get({email});
      if (doc !== null) {
        const match = await bcrypt.compare(password, doc.password);
        console.log('--------Match-------', match);
        if (!match) {
          this.systemResponse.failure(res,'Invalid Password',500, {message:'Enter correct password'});
          res.send(`Invalid password.`);
        }
        const id = doc.originalId;
        const role = doc.role;
        const token = jwt.sign({ id, email, role }, config.SECRET_KEY);
        this.systemResponse.success(res,'Authorized User',200, {message: 'ok', tokenString: token});
      } else {
        this.systemResponse.failure(res,`Invalid email`,403, {message: 'make sure to add @successive.tech'});
      }
    } catch(err) {
      this.systemResponse.failure(res,'failed to login in',500,{message: 'Server error'});
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
        this.systemResponse.success(res, `User Profile`, 200, profile);
      })
      .catch(err => {
        this.systemResponse.failure(res, 'No Such userExits', 500, err);
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
