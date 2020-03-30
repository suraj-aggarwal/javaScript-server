import * as mongoose from 'mongoose';

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

  public async create(data: any = {}): Promise<D> {
      if (!data.createdBy) {
        data.createdBy = data.userId;
      }
      const record = {
        ...data,
        originalId: this.getObjectId()
      };
      return  this.modelType.create(record);
  }

  public async update(record: any = {}): Promise<object> {
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
      return this.modelType.create(updateRecord);
    }
    return result;
  }

  public async get(query: any = {}, options: any = {}): Promise<D> {
    if (query.id) {
      query.originalId = query.id;
      delete query.id;
    }
    query = { deletedAt: undefined, ...query };
    return  this.modelType.findOne(query, options).lean();
  }

  public async getAllRecord(query: any = {}, options: any = {}): Promise<D[]> {
    return  this.modelType.find(
      { ...query, deletedAt: undefined },
      {},
      options
    );
  }

  public async delete(record: any = {}): Promise<object> {
    const { id, userId } = record;
    const query = { originalId: id, deletedBy: undefined };
    const update = { deletedAt: new Date(), deletedBy: userId };
    return  this.modelType
      .findOneAndUpdate(query, update, { new: false })
      .lean();
  }


  public async isExits(query: any = {}): Promise<boolean> {
    if (query.id) {
      query.originalId = query.id;
      delete query.id;
    }
    query = { deletedAt: undefined, ...query };
    return  this.modelType.exists(query);
  }

}

export default VersionableRepository;
