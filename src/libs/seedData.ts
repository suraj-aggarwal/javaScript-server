import UserRepository from '../repositories/user/UserRepository';
const userRepo = new UserRepository();
export const seedData = () => {
    const seedUser = {
        name : 'suraj',
        email : 'trainee@successive.tech',
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
            user => console.log('User Added Successfully', user)
            ).catch(err => console.log(err));
        }
        console.log(`number of users ${count}`);
    }).catch(err => console.log(err));
};