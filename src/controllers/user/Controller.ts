import { Response, request } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import { IRequest } from '../../libs/interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';
import SystemResponse from '../../libs/routes/SystemRespone';

class UserController {

    static instance: UserController;
    private systemResponse = new SystemResponse();
    static getInstance(): UserController {
        if (UserController.instance instanceof UserController) {
            return UserController.instance;
        }
        return UserController.instance = new UserController();
    }
    private constructor() { }

    private userRepo = new UserRepository();

    private count = () => {
        this.userRepo.count();
    }

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
                return this.systemResponse.success(res, req, 'user added successfully', 200);
            } else {
                return this.systemResponse.success(res, req, 'user add failed', 500);
            }
        } catch (error) {
            return this.systemResponse.failure(res, req, error, `can't add user`, 500);
        }

    }
    listUsers = (req: IRequest, res: Response): void => {
        console.log('---------TRAINEE LIST------------');
    }

    updateUser = async (req: IRequest, res: Response): Promise<void> => {
        console.log('----------updateUser-----------');
        console.log('------------ID------------', req.body['id']);
        console.log('---------REQUEST UDATE------', req.body['dataToUpdate']);
        try {
            const record = {
                originalId: req.body.id,
                dataToUpdate: req.body.dataToUpdate,
                _authId: req.user._authId
            };
            const result = await this.userRepo.update(record);
            if (result !== null) {
                return this.systemResponse.success(res, req, 'user updated successfully', 200);
            }
            return this.systemResponse.failure(res, req, Error(`fields are not correct.`), 'Invalid id', 500);
        } catch (error) {
            return this.systemResponse.failure(res, req, error, 'Invalid id', 500);
        }
    }

    deleteUser = async (req: IRequest, res: Response): Promise<void> => {
        console.log('---------DELETE TRAINEE------------');
        try {
            const deleteRecord = {
                _authId: req.user._authId,
                recordId: req.params.id
            };
            const result = await this.userRepo.delete(deleteRecord);
            if (result !== null) {
                return this.systemResponse.success(res, req, `user deleted successfully`, 200);
            }

        } catch (error) {
            this.systemResponse.failure(res, req, error , `can't delete user`, 500);
        }
    }

    userProfile = (req: IRequest, res: Response): void => {
        this.userRepo.profile(req.body['id'])
            .then(profile => {
                if (!profile) {
                    console.log('--------user Profile----------', profile);
                    res.send(profile);
                }
                res.send(`Document Does not exits.`);
            }).catch(err => {
                res.send(err);
                console.log();
            });
    }

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
            const token = jwt.sign({ email, password }, config.SECRECT_KEY);
            res.send(token);
        } else {
            res.send(`Invalid email`);
        }
    }
}

export default UserController.getInstance();