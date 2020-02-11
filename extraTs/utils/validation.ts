<<<<<<< HEAD
import { validateEmail } from './helper';
import { Iuser } from '../interface';

const validateUsers = (users: Iuser[]) => {
    const validUsers: Iuser[] = [];
    const invalidUsers: Iuser[] = [];
    users.forEach((user: Iuser) => {
        const { reviewerName, traineeName }: Iuser = user;
        if (validateEmail(traineeName) && validateEmail(reviewerName)) {
=======
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
>>>>>>> 9a626fdc0a78e198fa5f260e854bfa4d9042daf5
            validUsers.push(user);
        } else {
            invalidUsers.push(user);
        }
    });

    console.log('valid users : ', validUsers, ' ', validUsers.length);
    console.log('Invalid users', invalidUsers, ' ', invalidUsers.length);
};

export default validateUsers;