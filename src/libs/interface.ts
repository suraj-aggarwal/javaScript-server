interface Iuser {
    traineeName: string;
    reviewerName: string;
}

interface Ipermissions {
    getUsers: Imodule;
}

interface Imodule {
    all: string[];
    read: string[];
    write: string[];
    delete: string[];
}

interface IUser {
    _id: string;
    name: string;
    email: string;
    address: string;
    mod: number;
    dob: Date;
    hobbies: [string];
}

export { Iuser, Ipermissions, IUser };