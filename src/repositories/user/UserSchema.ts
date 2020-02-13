import { VersionableSchema } from '../versionable/VersionableSchema';
class UserSchema extends VersionableSchema {
    constructor(option) {
        console.log('-------------UserSchema----------', VersionableSchema);
        const userSchema = {
            name: String,
            email: String,
            address: String,
            mod: Number,
            dob: Date,
            hobbies: [String],
        };
        super(userSchema, option);
    }
}

export default UserSchema;