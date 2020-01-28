import { validateEmail } from './helper';

const validateUsers = (users): void => {
    const validUsers: string[] = [];
    const invalidUsers: string[] = [];

    users.forEach((user) => {
        const { traineeName, reveiwerName } = user;
        if (validateEmail(traineeName)) {
            validUsers.push(traineeName);
        } else {
            invalidUsers.push(traineeName);
        }

        if (validateEmail(reveiwerName)) {
            validUsers.push(reveiwerName);
        } else {
            invalidUsers.push(reveiwerName);
        }
    });
    console.log(validUsers, ' ', validUsers.length);
    console.log(invalidUsers, ' ', invalidUsers.length);
};

export default validateUsers;