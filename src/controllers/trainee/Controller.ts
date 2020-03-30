import { Request, Response } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import SystemResponse from '../../libs/routes/SystemResponse';
import { IRequest } from '../../libs/interface';
import { initSearch } from '../../libs/utils/helper';

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
  private constructor() { }

  create = async (req: IRequest, res: Response): Promise<Response> => {
    try {
      const data = req.body;
      const { userId = '' } = req.user || {};
      const record = { ...data, userId };
      const result = await this.userRepo.create(record);
      if (result) {
        delete result._id;
        return this.systemResponse.success(
          res,
          `Trainee added Successfully`,
          200,
          result
        );
      }
      return this.systemResponse.success(res, `can't create user`, 403, result);
    } catch (err) {
      return this.systemResponse.failure(res, err.message, 500, err);
    }
  };

  list = async (req: IRequest, res: Response): Promise<Response> => {
    try {
      const { skip, limit, sort, search, ...query } = req.query;
      const options: object = { skip, limit, sort };
      const filter: object = await initSearch(search);
      let result;
      const querySchema = Object.keys(filter).length ? filter : query;
      result = await this.userRepo.getAllRecord(querySchema, options);
      if (result.length) {
        return this.systemResponse.success(res, 'list of users', 200, {
          count: result.length,
          result
        });
      }
      return this.systemResponse.failure(res, 'No user exits', 200, {
        count: result.length,
        result
      });
    } catch (err) {
      return this.systemResponse.failure(res, 'No user exits', 200, err);
    }
  };

  update = async (req: IRequest, res: Response): Promise<Response> => {
    try {
      const { id, dataToUpdate } = req.body;
      const { userId } = req.user;
      const record = { id, dataToUpdate, userId };
      const result = await this.userRepo.update(record);
      if (result) {
        delete result['_id'];
        return this.systemResponse.success(
          res,
          `Trainee updated Successfully`,
          200,
          result
        );
      }
      return this.systemResponse.failure(res, `can't find record`, 403, result);
    } catch (err) {
      return this.systemResponse.failure(res, err.message, 500, err);
    }
  };

  delete = async (req: IRequest, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { userId } = req.user;
      const record = { id, userId };
      const result = await this.userRepo.delete(record);
      if (result) {
        delete result['_id'];
        return this.systemResponse.success(
          res,
          `Trainee deleted Successfully`,
          200,
          result
        );
      }
      return this.systemResponse.failure(res, 'No Such record exits', 500, result);
    } catch (err) {
      return this.systemResponse.failure(res, 'Unauthorized access', 500, err);
    }
  };
}

export default TraineeController.getInstance();
