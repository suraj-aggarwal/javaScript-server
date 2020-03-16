import { Request, Response } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import SystemResponse from '../../libs/routes/SystemResponse';
import { IRequest } from '../../libs/interface';
import * as queryString from 'query-string';

class TraineeController {
  static instance: TraineeController;
  public userRepo = new UserRepository();
  private systemResponse: SystemResponse = new SystemResponse();
  static getInstance(): TraineeController {
    if (TraineeController.instance instanceof TraineeController) {
      return TraineeController.instance;
    }
    return (TraineeController.instance = new TraineeController());
  }
  private constructor() {}

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
          res,
          `Trainee added Successfully`,
          200,
          result
        );
      } else {
        this.systemResponse.success(res, `Unauthorized User`, 403, result);
      }
    } catch (err) {
      this.systemResponse.failure(res, err.message, 500, err);
    }
  };

  list = async (req: IRequest, res: Response) => {
    try {
      const { skip, limit, sort, search, ...query } = req.query;
      const options: object = { skip, limit, sort };
      const filter: object = queryString.parse(search);
      let result;
      if (Object.keys(filter).length) {
        Object.keys(filter).map(key => {
          const regex = new RegExp('^' + filter[key]);
          filter[key] = { $regex: regex, $options: 'i' };
        });
        result = await this.userRepo.getAllRecord(filter, options);
      } else {
        result = await this.userRepo.getAllRecord(query, options);
      }

      if (result.length !== 0) {
        this.systemResponse.success(res, 'list of users', 200, {
          count: result.length,
          result
        });
      } else {
        this.systemResponse.failure(res, 'No user exits', 200, {
          count: result.length,
          result
        });
      }
    } catch (err) {
      this.systemResponse.failure(res, 'No user exits', 200, err);
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
          res,
          `Trainee updated Successfully`,
          200,
          result
        );
      } else {
        this.systemResponse.failure(res, `can't find record`, 403, result);
      }
    } catch (err) {
      this.systemResponse.failure(res, err.message, 500, err);
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
          res,
          `Trainee deleted Successfully`,
          200,
          result
        );
      } else {
        this.systemResponse.failure(res, 'No Such record exits', 500, result);
      }
    } catch (err) {
      this.systemResponse.failure(res, 'Unauthorized access', 500, err);
    }
  };
}

export default TraineeController.getInstance();
