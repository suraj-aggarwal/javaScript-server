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
            validUsers.push(user);
        } else {
            invalidUsers.push(user);
        }
    });

    console.log('valid users : ', validUsers, ' ', validUsers.length);
    console.log('Invalid users', invalidUsers, ' ', invalidUsers.length);
};

export default validateUsers;