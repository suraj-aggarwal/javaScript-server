import { userModel } from './UserModel';
import VersionableRepository from '../versionable/VersionableRepository';
import IUserModel from './IUserModel';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

class UserRepository extends VersionableRepository<
  IUserModel,
  mongoose.Model<IUserModel>
> {
  constructor() {
    super(userModel);
  }
  public count = () => {
    return userModel.countDocuments();
  };

  public create = (data): Promise<IUserModel> => {
    console.log('----------IN USERREPOSITORY CREATE METHOD-----------');
    const hash = bcrypt.hashSync(data.password, 10);
    data.password = hash;
    return super.create(data);
  };

  public delete = record => {
    console.log('----------DELETE USER-------------', record);
    return super.delete(record);
  };

  public update = record => {
    return super.update(record);
  };

  public isExists = (id: string, email: string) => {
    console.log('----------isExits-----------', id, email);
    const condition = { _id: id, email };
    return userModel.exists(condition);
  };

  public profile = (id: string) => {
    console.log('----------------User Profile Inside Controller--------------');
    return userModel.findOne({ originalId: id, deletedAt: undefined });
  };

  public get = query => {
    return super.get(query);
  };

  // public getAllRecord = (filter) => {
  //     return super.getAllRecord(filter);
  // }

  public getAllRecord = (query: object = {}, options: object = {}) => {
    return super.getAllRecord(query, options);
  };

  public search = query => {
    return super.search(query);
  };
}

export default UserRepository;
