import UserRepository from '../repositories/user/UserRepository';
import config from '../config/configuration';

const userRepo = new UserRepository();
export const seedData = () => {
    const seedUser = {
        name: 'suraj',
        email: 'trainee@successive.tech',
        password: config.PASSWORD,
        mob: 900290282,
        role: 'head-trainer',
        dob: new Date(),
        address: 'c-121 ,east delhi',
        hobbies: ['swimming'],
        createdBy: 'head-trainer',
        createdAt: new Date()
    };

    userRepo.count().then((count: number) => {
        if (!count) {
            return userRepo.create(seedUser).then(
                user => console.log('User Added Successfully', user)
            ).catch(err => console.log(err));
        }
        console.log(`number of users ${count}`);
    }).catch(err => console.log(err));
};