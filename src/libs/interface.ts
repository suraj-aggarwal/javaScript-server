import { Request } from 'express';

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
    _authId: string;
    email: string;
}

interface IRequest extends Request {
    user: IUser;
}
export { Iuser, Ipermissions, IUser, IRequest  };