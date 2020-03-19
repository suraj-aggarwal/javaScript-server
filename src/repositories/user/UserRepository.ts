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
    const hash = bcrypt.hashSync(data.password, 10);
    data.password = hash;
    return super.create(data);
  };

  public delete = record => {
    return super.delete(record);
  };

  public update = record => {
    return super.update(record);
  };

  public isExists = (id: string, email: string) => {
    const query = { originalId: id, email };
    return super.isExits(query);
  };

  public profile = (id: string) => {
    return super.get({ id });
  };

  public get = (query) => {
    return super.get(query);
  };

  public getAllRecord = (query: any = {}, options: any = {}) => {
    if (!options.sort) {
      options.sort = 'createdAt';
    }
    return super.getAllRecord(query, options);
  };
}

export default UserRepository;
