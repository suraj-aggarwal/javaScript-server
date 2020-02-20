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
        const record = req.body;
        this.userRepo.create(record).then(err => {
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
        const {id, dataToUpdate} = req.body;
        this.userRepo.update(id, dataToUpdate)
        .then(result => res.send(result))
        .catch(err => res.send(err));
    }

    deleteUser = (req: Request, res: Response): void => {
        console.log('---------DELETE TRAINEE------------');
       const { id } = req.params;
        this.userRepo.delete(id)
        .then(user => res.send(`Deletion Sucessfull ${{user}}`))
        .catch(err => res.send(`Deletion Failed ${err}`));
    }

    userProfile = (req: Request, res: Response): void => {
        const{ id } = req.body;
        this.userRepo.profile(id)
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