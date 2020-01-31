const permissions = {
    'getUsers': {
        all: ['head-Trainer'],
        read: ['Trainer', 'Trainee'],
        write: ['Trainer'],
        delete: []
    }
}

const users = [
    {
        traineeName: "suraj.aggarwal@succesive.tech",
        reveiwerName: "madhav.bansal@successive.tech"
    },
    {
        traineeName: "anjali.shah@successive.tech",
        reveiwerName: "pooja.thapa@successive.tech"
    }
]

export { permissions, users };
