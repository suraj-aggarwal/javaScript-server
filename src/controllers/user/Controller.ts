import { Request, Response } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import { IRequest } from '../../libs/interface';
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

    public count = () => {
        this.userRepo.count();
    }

     addUser = async (req: IRequest, res: Response): Promise<void> => {
        console.log('---------ADD USER------------');

        try {
            const _authId = req.user._authId;
            const data = req.body;
            const record = {...data , _authId};
            const result = await this.userRepo.create(record);
            if (result) {
                this.systemResponse.success(req, res, `Trainee added Successfully`, 200, result);
            } else {
                this.systemResponse.success(req, res, `Unauthorized User`, 403, result);
            }

        } catch (err) {
            this.systemResponse.failure(req, res, err.message, 500, err);
        }
    }
    listUsers = (req: IRequest, res: Response): void => {
        console.log('---------TRAINEE LIST------------');
    }

    updateUser = async (req: IRequest, res: Response): Promise<void> => {
        console.log('----------updateUser-----------');
        try {
            const { id, dataToUpdate} = req.body;
            const _authId = req.user._authId;
            const record = {id, dataToUpdate, _authId};
            const result = await this.userRepo.update(record);
            if (result) {
                this.systemResponse.success(req, res, `Trainee updated Successfully`, 200, result);
            } else {
                this.systemResponse.failure(req, res, `can't find record`, 403, result);
            }
        } catch (err) {
            this.systemResponse.failure(req, res, err.message, 500, err);
        }
    }

    deleteUser = async (req: IRequest, res: Response): Promise<void> => {
        console.log('---------DELETE TRAINEE------------');
        try {
            const { id } = req.params;
            const _authId = req.user._authId;
            const record = {id, _authId};
            const result = await this.userRepo.delete(record);
            if (result) {
                this.systemResponse.success(req, res, `Trainee deleted Successfully`, 200, result);
            } else {
                this.systemResponse.failure(req, res, 'No Such record exits', 500, result);
            }
        } catch (err) {
            this.systemResponse.failure(req, res, 'Unauthorized access', 500, err);
        }
    }

    userProfile = (req: Request, res: Response): void => {
        const { id } = req.body;
        this.userRepo.profile(id)
            .then(profile => {
                console.log('--------user Profile----------', profile);
                this.systemResponse.success(req, res, `User Profile`, 200, profile);
            }).catch(err => {
                this.systemResponse.failure(req, res, 'No Such userExits', 500, err);
            });
    }

    isExists = (id: string, email: string): boolean => {
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