<<<<<<< HEAD
const validateEmail = str => {
    console.log('------validateEmail--------', str);
    const regex = /^[A-Za-z0-9._%+-]+@successive.tech$/;
    return regex.test(str);
};

const validateUsers = (users) => {
    const validUsers = [];
    const invalidUsers = [];

    users.forEach(user => {
        const { traineeName, reveiwerName } = user;
        if (validateEmail(traineeName) && validateEmail(reveiwerName)) {
=======
import { validateEmail } from './helper';
import { Iuser } from '../interface';

const validateUsers = (users: Iuser[]) => {
    const validUsers: Iuser[] = [];
    const invalidUsers: Iuser[] = [];
    users.forEach((user: Iuser) => {
        const { reviewerName, traineeName }: Iuser = user;
        if (validateEmail(traineeName) && validateEmail(reviewerName)) {
>>>>>>> be8cb4ec034b2ffa545c2e0c6bed4276ab9a5459
            validUsers.push(user);
        } else {
            invalidUsers.push(user);
        }
    });

    console.log('valid users : ', validUsers, ' ', validUsers.length);
    console.log('Invalid users', invalidUsers, ' ', invalidUsers.length);
};

export default validateUsers;