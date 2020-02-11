import { Schema, SchemaType }  from 'mongoose';
import Iuser from './IUserModel';

class UserSchema extends Schema {

    constructor(option) {
        const userSchema = {
            name: String,
            email: String,
            address: String,
            mod: Number,
            dob: Date,
            hobbies: [String]
        };
        super(userSchema, option);
    }
}

export default UserSchema;