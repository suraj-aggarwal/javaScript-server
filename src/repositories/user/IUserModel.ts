import { IVersionableDocument } from '../versionable/IversionableDocument';
interface IUserModel extends IVersionableDocument {
    id: string;
    name: string;
    email: string;
    password: string;
    address: string;
    mob: number;
    dob: Date;
    role: string;
    hobbies: [string];
}

export default IUserModel;