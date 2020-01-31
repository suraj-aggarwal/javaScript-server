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

export { Iuser, Ipermissions };