import { Request, Response, request } from 'express';
import UserRepository from '../../repositories/user/UserRepository';

class UserController {

    static instance: UserController;
    static getInstance(): UserController {
        if (UserController.instance instanceof UserController) {
            return UserController.instance;
        }
        return UserController.instance = new UserController();
    }
    private constructor() {}

    private userRepo = new UserRepository();

    private count = () => {
        this.userRepo.count();
    }

    addUser = (req: Request, res: Response): void => {
        console.log('---------ADD USER------------');
        this.userRepo.create(req.body).then(err => {
            res.send('Trainee added Successfully');
            }
        ).catch(err => {
            res.send(err);
        });
    }
    listUsers = (req: Request, res: Response): void => {
        console.log('---------TRAINEE LIST------------');
    }

    updateUser = (req: Request, res: Response): void => {
        console.log('----------updateUser-----------');
        console.log('------------ID------------', req.body['id']);
        console.log('---------REQUEST UDATE------', req.body['dataToUpdate']);
        this.userRepo.update(req.body['id'],req.body['dataToUpdate'])
        .then(result => res.send(result))
        .catch(err => res.send(err));
    }

    deleteUser = (req: Request, res: Response): void => {
        console.log('---------DELETE TRAINEE------------');
        this.userRepo.delete(req['id'])
        .then(user => res.send(user))
        .catch(err => res.send(err));
    }

    userProfile = (req: Request, res: Response): void => {
        this.userRepo.profile(req.body['id'])
        .then(profile => {
                console.log('--------user Profile----------', profile);
                res.send(profile);
            }).catch(err => {
                res.send(err);
                console.log();
        });
    }
}

export default UserController.getInstance();