import { Request, Response } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import SystemResponse from '../../libs/routes/SystemResponse';

class UserController {

    static instance: UserController;
    private systemResponse: SystemResponse = new SystemResponse();
    static getInstance(): UserController {
        if (UserController.instance instanceof UserController) {
            return UserController.instance;
        }
        return UserController.instance = new UserController();
    }
    private constructor() { }

    private userRepo = new UserRepository();

    addUser = (req: Request, res: Response): void => {
        console.log('---------ADD USER------------');
        const record = req.body;
        this.userRepo.create(record).then(result => {
            this.systemResponse.success(req, res, `Trainee added Successfully`, 200, result);
        }
        ).catch(err => {
            this.systemResponse.failure(req, res, err.message, 500, err);
        });
    }
    listUsers = (req: Request, res: Response): void => {
        console.log('---------TRAINEE LIST------------');
    }

    updateUser = (req: Request, res: Response): void => {
        console.log('----------updateUser-----------');
        const { id, dataToUpdate } = req.body;
        this.userRepo.update(id, dataToUpdate)
            .then(result => this.systemResponse.success(req, res, `Trainee updated Successfully`, 200, result))
            .catch(err => this.systemResponse.failure(req, res, err.message, 500, err));
    }

    deleteUser = (req: Request, res: Response): void => {
        console.log('---------DELETE TRAINEE------------');
        const { id } = req.params;
        this.userRepo.delete(id)
            .then(user => {
                console.log(user);
                if (user) {
                    this.systemResponse.success(req, res, `Trainee deleted Successfully`, 200, user);
                } else {
                    this.systemResponse.failure(req, res, 'No Such userExits', 500, user);
                }
            })
            .catch(err => this.systemResponse.failure(req, res, 'Deletion Failed', 500, err));
    }

    userProfile = (req: Request, res: Response): void => {
        const { id } = req.body;
        this.userRepo.profile(id)
            .then(profile => {
                console.log('--------user Profile----------', profile);
                this.systemResponse.success(req, res, `Trainee deleted Successfully`, 200, profile);
            }).catch(err => {
                this.systemResponse.failure(req, res, 'No Such userExits', 500, err);
            });
    }

    isExits = (id: string, email: string): boolean => {
        this.userRepo.isExists(id, email).then(permission => {
            console.log('-----------------permissions-----------', permission);
            return permission;
        }).catch(err => {
            return false;
        });
        return false;
    }
}

export default UserController.getInstance();