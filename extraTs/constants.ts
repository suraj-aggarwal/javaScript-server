import { Iusers, Ipermission } from './interface';

const permissions: Ipermission = {
    'getUsers': {
        all: ['head-Trainer'],
        read: ['Trainer', 'Trainee'],
        write: ['Trainer'],
        delete: []
    }
};

const users: Iusers[] = [
    {
        traineeName: 'suraj.aggarwal@succesive.tech',
        reveiwerName: 'madhav.bansal@successive.tech'
    },
    {
        traineeName: 'anjali.shah@successive.tech',
        reveiwerName: 'pooja.thapa@successive.tech'
    }
];

export { permissions, users };
