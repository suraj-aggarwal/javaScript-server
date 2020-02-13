import * as mongoose from 'mongoose';
import UserSchema from './UserSchema';
import IUserModel from './IUserModel';
console.log('----------------UserModel UserSchema------------', UserSchema);
export const userSchema = new UserSchema({
collection: 'Users',
});

export const userModel: mongoose.Model<IUserModel> =
mongoose.model<IUserModel>('User', userSchema, 'Users', true);