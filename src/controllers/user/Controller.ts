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

  public count = () => {
    this.userRepo.count();
  };

  create = async (req: IRequest, res: Response): Promise<void> => {
    console.log('---------ADD USER------------');

    try {
      const userId = req.user.userId;
      const data = req.body;
      const record = { ...data, userId };
      const result = await this.userRepo.create(record);
      if (result) {
        delete result._id;
        this.systemResponse.success(
          req,
          res,
          `Trainee added Successfully`,
          200,
          result
        );
      } else {
        this.systemResponse.success(req, res, `Unauthorized User`, 403, result);
      }
    } catch (err) {
      this.systemResponse.failure(req, res, err.message, 500, err);
    }
  };
  get = async (req: IRequest, res: Response): Promise<void> => {
    console.log('---------TRAINEE------------');
    try {
      const query = req.query;
      const result = await this.userRepo.get(query);
      if (result) {
        delete result._id;
        this.systemResponse.success(req, res, 'Trainee details', 200, result);
      } else {
        this.systemResponse.failure(
          req,
          res,
          'No matching records',
          500,
          result
        );
      }
    } catch (err) {
      this.systemResponse.failure(req, res, err.message, 500, err);
    }
  };

  update = async (req: IRequest, res: Response): Promise<void> => {
    console.log('----------updateUser-----------');
    try {
      const { id, dataToUpdate } = req.body;
      const userId = req.user.userId;
      const record = { id, dataToUpdate, userId };
      const result = await this.userRepo.update(record);
      if (result) {
        delete result['_id'];
        this.systemResponse.success(
          req,
          res,
          `Trainee updated Successfully`,
          200,
          result
        );
      } else {
        this.systemResponse.failure(req, res, `can't find record`, 403, result);
      }
    } catch (err) {
      this.systemResponse.failure(req, res, err.message, 500, err);
    }
  };

  delete = async (req: IRequest, res: Response): Promise<void> => {
    console.log('---------DELETE TRAINEE------------');
    try {
      const { id } = req.params;
      const userId = req.user.userId;
      const record = { id, userId };
      const result = await this.userRepo.delete(record);
      if (result) {
        delete result['_id'];
        this.systemResponse.success(
          req,
          res,
          `Trainee deleted Successfully`,
          200,
          result
        );
      } else {
        this.systemResponse.failure(
          req,
          res,
          'No Such record exits',
          500,
          result
        );
      }
    } catch (err) {
      this.systemResponse.failure(req, res, 'Unauthorized access', 500, err);
    }
  };
  login = async (req: IRequest, res: Response): Promise<void> => {
    const email = req.body.email;
    const password = req.body.password;
    const doc = await this.userRepo.get(email);
    console.log(doc);
    if (doc !== null) {
      const match = await bcrypt.compare(password, doc.password);
      console.log('--------Match-------', match);
      if (!match) {
        res.send(`Invalid password.`);
      }
      const id = doc.originalId;
      const token = jwt.sign({ id, email }, config.SECRET_KEY);
      res.send(token);
    } else {
      res.send(`Invalid email`);
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
