const permissions = {
    'getUsers': {
        all: ['head-trainer'],
        read: ['trainer', 'trainee'],
        write: ['trainer'],
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
