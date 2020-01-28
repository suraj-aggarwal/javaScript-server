interface Iusers {
    traineeName: string;
    reveiwerName: string;
}

interface Ipermission {
    getUsers: Imodule;
}

interface Imodule {
    all: string[];
    read: string[];
    write: string[];
    delete: string[];
}

export { Iusers, Ipermission };
