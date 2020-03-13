import * as mongoose from 'mongoose';
import { request } from 'express';

class VersionableRepository<
  D extends mongoose.Document,
  M extends mongoose.Model<D>
> {
  private modelType: M;
  constructor(model) {
    this.modelType = model;
  }

  public getObjectId() {
    return mongoose.Types.ObjectId();
  }

  public create(data): Promise<D> {
    console.log('----------IN VERSIONABLE REPO---------', data);
    data.createdBy = data.userId;
    data.originalId = this.getObjectId();
    return this.modelType.create(data);
  }

  public async update(record): Promise<object> {
    console.log('----------IN VERSIONABLE REPO---------', record);
    const { id, userId } = record;
    const result = await this.delete({ id, userId });
    if (result) {
      const updateRecord = {
        ...result,
        ...record.dataToUpdate,
        updatedAt: new Date(),
        updatedBy: userId
      };
      delete updateRecord._id;
      console.log('---------Updated record -----------', updateRecord);
      return this.modelType.create(updateRecord);
    }
    return result;
  }
  public async get(query: any = {}, options: any = {}): Promise<D> {
    console.log('--------- FIND --------');
    console.log(query);
    if (query.id) {
      query.originalId = query.id;
      query.deletedAt = undefined;
      delete query.id;
    }
    return await this.modelType.findOne(query, options).lean();
  }
  public async getAllRecord(filter): Promise<D[]> {
    console.log('---------------getAllRecords-------------', filter);
    const logSkip = Number(filter.skip);
    const logLimit = Number(filter.limit);
    const result = await this.modelType
      .find(filter.query)
      .sort(filter.option === '' ? 'createdAt' : filter.option)
      .limit(logLimit)
      .skip(logSkip);
    console.log(result);
    return result;
  }

  public async search(query): Promise<D> {
    console.log('-----------search-----------');
    const result = await this.modelType.findOne(query);
    if (result) {
      return result.toJSON();
    }
    return result;
  }

  public async delete(record): Promise<object> {
    console.log('----------IN VERSIONABLE REPO---------', record);
    const { id, userId } = record;
    const query = { originalId: id, deletedBy: undefined };
    const update = { deletedAt: new Date(), deletedBy: userId };
    return await this.modelType
      .findOneAndUpdate(query, update, { new: false })
      .lean();
  }
}

export default VersionableRepository;
