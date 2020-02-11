import UserRepository from '../repositories/user/UserRepository';
import { Document } from 'mongoose';
import IUserModel from '../repositories/user/IUserModel';
const userRepo = new UserRepository();
export const seedData = () => {
    const seedUser = {
        name : 'suraj',
        email : 'hiiamsurajaggarwal12@gmail.com',
        mob : 900290282,
        dob : new Date(),
        address : 'c-121 ,east delhi',
        hobbies : ['swimming']
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