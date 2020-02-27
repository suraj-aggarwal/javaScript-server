import { IVersionableDocument } from '../versionable/IversionableDocument';
interface IUserModel extends IVersionableDocument {
    id: string;
    name: string;
    email: string;
    role: string;
    address: string;
    mob: number;
    dob: Date;
    hobbies: [string];
}

export default IUserModel;