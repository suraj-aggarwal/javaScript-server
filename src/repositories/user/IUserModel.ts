import { Document } from 'mongoose';
interface IUserModel extends Document {
    id: string;
    name: string;
    email: string;
    address: string;
    mob: number;
    dob: Date;
    hobbies: [string];
}

export default IUserModel;