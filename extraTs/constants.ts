<<<<<<< HEAD
import { Ipermissions, Iuser } from './interface';
=======
import { Ipermissions, Iusers } from './interface';
>>>>>>> 9a626fdc0a78e198fa5f260e854bfa4d9042daf5

const permissions: Ipermissions = {
    'getUsers': {
        all: ['head-Trainer'],
        read: ['Trainer', 'Trainee'],
        write: ['Trainer'],
        delete: []
    }
};

<<<<<<< HEAD
const users: Iuser[] = [
=======
const users: Iusers[] = [
>>>>>>> 9a626fdc0a78e198fa5f260e854bfa4d9042daf5
    {
        traineeName: 'suraj.aggarwal@succesive.tech',
        reviewerName: 'madhav.bansal@successive.tech'
    },
    {
        traineeName: 'anjali.shah@successive.tech',
        reviewerName: 'pooja.thapa@successive.tech'
    }
];

export { permissions, users };
