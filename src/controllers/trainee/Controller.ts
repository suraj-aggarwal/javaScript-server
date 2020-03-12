import { Request, Response } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import SystemResponse from '../../libs/routes/SystemResponse';
import { IRequest } from '../../libs/interface';

class TraineeController {
    static instance: TraineeController;
    public userRepo = new UserRepository();
    private systemResponse: SystemResponse = new SystemResponse();
    static getInstance(): TraineeController {
        if (TraineeController.instance instanceof TraineeController) {
            return TraineeController.instance;
        }
        return TraineeController.instance = new TraineeController();
    }
    private constructor() { }

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

    list = async (req: Request, res: Response) => {
        console.log('---------TRAINEE LIST------------');
        const query: object = {role: 'trainee', deletedBy: undefined};
        const option: string = req.body.option;
        const filter: object = {query, skip: req.query.skip, limit: req.query.limit, option};
        const result = await this.userRepo.getAllRecord(filter);
        const count = result.length;
        console.log('------COUNT-------', count);
        const resultSet = {count, result};
        if (result !== null) {
            res.send(resultSet);
        } else {
            res.send(resultSet);
        }
    }

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

    search = async (req: Request, res: Response): Promise<void> => {
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
    }
}

export default TraineeController.getInstance();