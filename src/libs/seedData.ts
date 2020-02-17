import UserRepository from '../repositories/user/UserRepository';
import config from '../config/configuration';
import * as bcrypt from 'bcrypt';

const userRepo = new UserRepository();
const hash = bcrypt.hashSync(config.PASSWORD, 10);
export const seedData = () => {
    const seedUser = {
        name : 'suraj',
        email : 'trainee@successive.tech',
        password: hash,
        mob : 900290282,
        dob : new Date(),
        address : 'c-121 ,east delhi',
        hobbies : ['swimming'],
        createBy : 'Head-Trainer',
        role: 'head-trainer'
    };

    userRepo.count().then( (count: number) => {
        if (!count) {
            return userRepo.create(seedUser).then(
            user => console.log(user)
            ).catch(err => console.log(err));
        }
        console.log(`number of users ${count}`);
    }).catch(err => console.log(err));
};