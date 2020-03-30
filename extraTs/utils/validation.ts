import { validateEmail } from './helper';
import { Iuser } from '../interface';

const validateUsers = (users: Iuser[]) => {
    const validUsers: Iuser[] = [];
    const invalidUsers: Iuser[] = [];
    users.forEach((user: Iuser) => {
        const { reviewerName, traineeName }: Iuser = user;
        if (validateEmail(traineeName) && validateEmail(reviewerName)) {
            validUsers.push(user);
        } else {
            invalidUsers.push(user);
        }
    });

    console.log('valid users : ', validUsers, ' ', validUsers.length);
    console.log('Invalid users', invalidUsers, ' ', invalidUsers.length);
};

export default validateUsers;