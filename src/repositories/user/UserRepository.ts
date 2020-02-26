import { userModel } from './UserModel';
import VersionableRepository from '../versionable/VersionableRepository';
import IUserModel from './IUserModel';
import * as mongoose from 'mongoose';

class UserRepository extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {


    constructor() {
        super(userModel);
    }
    public count = () => {
        return userModel.countDocuments();
    }

    public create = (data): Promise<IUserModel> => {
        console.log('----------IN USERREPOSITORY CREATE METHOD-----------');
        return super.create(data);
    }

    public delete = (record) => {
        console.log('----------DELETE USER-------------', record);
        return super.delete({id: record.id, _authId: record._authId});
    };

    public update = (record) => {
        return super.update(record);
    }

    public isExists = (id: string, email: string) => {
        console.log('----------isExits-----------', id, email);
        const condition = { _id: id, email };
        return userModel.exists(condition);
    }

    public profile = (_id: string) => {
        console.log('----------------User Profile Inside Controller--------------');
        return userModel.findOne({ _id });
    }
}

export default UserRepository;