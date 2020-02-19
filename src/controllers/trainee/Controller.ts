import { Request, Response } from 'express';
import UserRepository from '../../repositories/user/UserRepository';

class TraineeController {
    static instance: TraineeController;
    public userRepo = new UserRepository();
    static getInstance(): TraineeController {
        if (TraineeController.instance instanceof TraineeController) {
            return TraineeController.instance;
        }
        return TraineeController.instance = new TraineeController();
    }
    private constructor() { }

    addTrainee = (req: Request, res: Response): void => {
        console.log('---------ADD TRAINEE------------');
        res.send({
            id: '1',
            traineeName: 'Suraj Aggarwal',
            traineeEmail: 'suraj@gmail.com',
            department: 'IT'
        });
    }

    listTrainee = async (req: Request, res: Response) => {
        console.log('---------TRAINEE LIST------------');
        const query: object = {role: 'trainee', deletedBy: undefined};
        const option: string = 'createdAt';
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

    updateTrainee = (req: Request, res: Response): void => {
        console.log('---------UPDATE TRAINEE------------');
        const trainee = {
            id: '2',
            traineeName: 'Suraj Aggarwal',
            traineeEmail: 'suraj@gmail.com',
            department: 'IT'
        };
        res.send(trainee);
    }

    deleteTrainee = (req: Request, res: Response): void => {
        console.log('---------DELETE TRAINEE------------');
        const trainee = {
            id: '2',
            traineeName: 'Suraj Aggarwal',
            traineeEmail: 'suraj@gmail.com',
            department: 'IT'
        };
        res.send(trainee);
    }

    search = (req: Request, res: Response): void => {
        console.log('-----------search-----------');
        try {
            console.log(req.query);
            const result = this.userRepo.search(req.query);
            if (result) {
                res.send(result);
            } else {
                res.send(result);
            }
        } catch (err) {
                res.send(err);
        }
    }
}

export default TraineeController.getInstance();