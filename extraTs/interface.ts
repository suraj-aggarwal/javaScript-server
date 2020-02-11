<<<<<<< HEAD
interface Iuser {
=======
interface Iusers {
>>>>>>> 9a626fdc0a78e198fa5f260e854bfa4d9042daf5
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

<<<<<<< HEAD
export { Iuser, Ipermissions };
=======
export { Iusers, Ipermissions };
>>>>>>> 9a626fdc0a78e198fa5f260e854bfa4d9042daf5
