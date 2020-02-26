import { Response, request } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import { IRequest } from '../../libs/interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';
import SystemResponse from '../../libs/routes/SystemResponse';

class UserController {
  static instance: UserController;
  private systemResponse = new SystemResponse();
  static getInstance(): UserController {
    if (UserController.instance instanceof UserController) {
      return UserController.instance;
    }
    return (UserController.instance = new UserController());
  }
  private constructor() {}

  private userRepo = new UserRepository();

  addUser = async (req: IRequest, res: Response): Promise<void> => {
    console.log('---------ADD USER------------');
    try {
      const body = req.body;
      const data = {
        ...body,
        _authId: req.user._authId
      };
      const hash = bcrypt.hashSync(data.password, 10);
      data.password = hash;
      console.log('------compelete data -----------', data);
      const result = await this.userRepo.create(data);
      if (result !== null) {
        return this.systemResponse.success(
          req,
          res,
          'user added successfully',
          200,
          result
        );
      } else {
        return this.systemResponse.success(
          req,
          res,
          'user add failed',
          500,
          result
        );
      }
    } catch (error) {
      return this.systemResponse.failure(
        req,
        res,
        `can't add user`,
        500,
        error
      );
    }
  };
  listUsers = (req: IRequest, res: Response): void => {
    console.log('---------TRAINEE LIST------------');
  };

  updateUser = async (req: IRequest, res: Response): Promise<void> => {
    console.log('----------updateUser-----------');
    console.log('------------ID------------', req.body.id);
    console.log('---------REQUEST UDATE------', req.body.dataToUpdate);
    try {
      const record = {
        originalId: req.body.id,
        dataToUpdate: req.body.dataToUpdate,
        _authId: req.user._authId
      };
      const result = await this.userRepo.update(record);
      if (result !== null) {
        return this.systemResponse.success(
          req,
          res,
          'user updated successfully',
          200,
          result
        );
      }
      return this.systemResponse.failure(
        req,
        res,
        `fields are not correct.`,
        500,
        result
      );
    } catch (error) {
      return this.systemResponse.failure(req, res, 'Invalid id', 500, error);
    }
  };

  deleteUser = async (req: IRequest, res: Response): Promise<void> => {
    console.log('---------DELETE TRAINEE------------');
    try {
      const deleteRecord = {
        _authId: req.user._authId,
        recordId: req.params.id
      };
      const result = await this.userRepo.delete(deleteRecord);
      if (result !== null) {
        return this.systemResponse.success(
          req,
          res,
          `user deleted successfully`,
          200,
          result
        );
      }
    } catch (error) {
      this.systemResponse.failure(req, res, `can't delete user`, 500, error);
    }
  };

  userProfile = (req: IRequest, res: Response): void => {
    this.userRepo
      .profile(req.body.id)
      .then(profile => {
        if (!profile) {
          console.log('--------user Profile----------', profile);
          res.send(profile);
        }
        res.send(`Document Does not exits.`);
      })
      .catch(err => {
        res.send(err);
        console.log();
      });
  };

  login = async (req: IRequest, res: Response): Promise<void> => {
    const email = req.body.email;
    const password = req.body.password;
    const doc = await this.userRepo.IsEmailExits(email);
    console.log(doc);
    if (doc !== null) {
      const match = await bcrypt.compare(password, doc.password);
      console.log('--------Match-------', match);
      if (!match) {
        res.send(`Invalid password.`);
      }
      const token = jwt.sign({ email, password }, config.SECRET_KEY);
      res.send(token);
    } else {
      res.send(`Invalid email`);
    }
  };
}

export default UserController.getInstance();
