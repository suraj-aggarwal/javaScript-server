import { Response, request } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import { IRequest } from '../../libs/interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';

class UserController {

    static instance: UserController;
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

    addUser = (req: IRequest, res: Response): void => {
        console.log('---------ADD USER------------');
        const body = req.body;
        const data = {
            ...body,
            _authId: req.user._authId
        };
        const hash = bcrypt.hashSync(data.password, 10);
        data.password = hash;
        console.log('------compelete data -----------', data);
        this.userRepo.create(data).then(err => {
            res.send('Trainee added Successfully');
        }
        ).catch(err => {
            res.send(err);
        });
    }
    listUsers = (req: IRequest, res: Response): void => {
        console.log('---------TRAINEE LIST------------');
    }

    updateUser = (req: IRequest, res: Response): void => {
        console.log('----------updateUser-----------');
        console.log('------------ID------------', req.body['id']);
        console.log('---------REQUEST UDATE------', req.body['dataToUpdate']);
        const record = {
            originalId: req.body.id,
            dataToUpdate: req.body.dataToUpdate,
            _authId: req.user._authId
        };
        this.userRepo.update(record)
            .then(result => {
                console.log('result form database .', result);
                if (!result) {
                    res.send(result);
                }
                res.send(` NO such user exits ${result}`);
            })
            .catch(err => res.send(err));
    }

    deleteUser = (req: IRequest, res: Response): void => {
        console.log('---------DELETE TRAINEE------------');
        const deleteRecord = {
            _authId: req.user._authId,
            recordId: req.params.id
        };
        this.userRepo.delete(deleteRecord)
            .then(user => {
                console.log('user ------', user);
                if (!user) {
                    res.send(user);
                }
                res.send('----No such User exits.-------');
            })
            .catch(err => res.send(err));
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

     login =  async (req: IRequest, res: Response): Promise<void> => {
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
            const token = jwt.sign({email, password}, config.SECRECT_KEY);
            res.send(token);
        } else {
            res.send(`Invalid email`);
        }
    }
}

export default UserController.getInstance();