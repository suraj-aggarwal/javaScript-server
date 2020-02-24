import { Ipermissions, Iuser } from './interface';

const permissions: Ipermissions = {
    getUsers : {
        all: ['head-trainer'],
        read: ['trainer', 'trainee'],
        write: ['trainer'],
        delete: []
    }
};

const users: Iuser[] = [
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
