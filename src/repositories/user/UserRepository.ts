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


    public delete = (id: string) => {
        console.log('----------DELETE USER-------------', id);
        return userModel.deleteOne(id);
    };

    public update = (id: string, dataToUpdate: object) => {
        console.log('----------User REPO --------udpate');
        return super.update(id, dataToUpdate);
    }

    public isExits = (id: string, email: string) => {
        console.log('----------isExits-----------', id, email);
        const _id = id;
        const condition = { _id: id, email };
        return userModel.exists(condition);
    }

    public profile = (_id: string) => {
        console.log('----------------User Profile Inside Controller--------------');
        return userModel.findOne({ _id });
    }
}

export default UserRepository;