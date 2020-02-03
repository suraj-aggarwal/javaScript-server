import { Request, Response } from 'express';

class TraineeController {
    static instance: TraineeController;
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

    listTrainee = (req: Request, res: Response): void => {
        console.log('---------TRAINEE LIST------------');
        const list = [
             {
                id: '1',
                traineeName: 'Suraj Aggarwal',
                traineeEmail: 'suraj@gmail.com',
                department: 'IT'
            },
             {
                id: '2',
                traineeName: 'Vishal Malhotra',
                traineeEmail: 'vishal@gmail.com',
                department: 'IT'
            },
             {
                id: '3',
                traineeName: 'Swapnil Parithosh',
                traineeEmail: 'swapnil@gmail.com',
                department: 'IT'
            }
        ];
        res.send(list);
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

    deleteTrainee = (req: Request, res: Response) => {
        console.log('---------DELETE TRAINEE------------');
        const trainee = {
            id: '2',
            traineeName: 'Suraj Aggarwal',
            traineeEmail: 'suraj@gmail.com',
            department: 'IT'
        };
        res.send(trainee);
    }
}

export default TraineeController.getInstance();