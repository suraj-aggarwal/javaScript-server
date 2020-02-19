import { VersionableSchema } from '../versionable/VersionableSchema';
class UserSchema extends VersionableSchema {
    constructor(option) {
        console.log('-------------UserSchema----------', VersionableSchema);
        const userSchema = {
            name: String,
            email: String,
            password: String,
            address: String,
            mod: Number,
            dob: Date,
            role: String,
            hobbies: [String],
        };
        super(userSchema, option);
    }
}

export default UserSchema;