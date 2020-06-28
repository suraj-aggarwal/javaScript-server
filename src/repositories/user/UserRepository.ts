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
  public async count() {
    return userModel.countDocuments();
  }

  public async create(data: any = {}): Promise<IUserModel> {
    const hash = bcrypt.hashSync(data.password, 10);
    data.password = hash;
    return super.create(data);
  }

  public  async delete(record: any = {}) {
    return super.delete(record);
  }

  public async update(record) {
    return super.update(record);
  }

  public async isExists(id: string, email: string) {
    const query = { originalId: id, email };
    return super.isExits(query);
  }

  public async get(query: any = {}) {
    return super.get(query);
  }

  public async getAllRecord (query: any = {}, options: any = {}) {
    if (!options.sort) {
      options.sort = 'createdAt';
    }
    return super.getAllRecord(query, options);
  }
}

export default UserRepository;

