import { VersionableSchema } from '../versionable/VersionableSchema';
import { Schema } from 'mongoose';
class UserSchema extends VersionableSchema {

    constructor() {
        const userSchema = new Schema({
            name: String,
            email: String,
            address: String,
            mod: Number,
            dob: Date,
            hobbies: [String]
        });
        super(userSchema);
    }
}

export default UserSchema;