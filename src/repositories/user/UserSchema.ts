import { VersionableSchema } from '../versionable/VersionableSchema';
class UserSchema extends VersionableSchema {
    constructor(option) {
        const userSchema = {
            name: String,
            email: String,
            role: String,
            address: String,
            mod: Number,
            dob: Date,
            hobbies: [String],
        };
        super(userSchema, option);
    }
}

export default UserSchema;