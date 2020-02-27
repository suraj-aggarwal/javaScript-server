import * as mongoose from 'mongoose';

class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D> > {

    private modelType: M;
    constructor(model) {
        this.modelType = model;
    }

    public getObjectId() {
        return mongoose.Types.ObjectId();
    }

    public create(data): Promise<D> {
        console.log('----------IN VERSIONABLE REPO---------', data);
        const record = {
            createdBy : data.userId,
            ...data,
            originalId: this.getObjectId()
        };
        return this.modelType.create(record);
    }

    public async update(record): Promise<object> {
    console.log('----------IN VERSIONABLE REPO---------', record);
    const {id, userId} = record;
    const result = await this.delete({id, userId});
        if (result) {
            const updateRecord = {
                ...result,
                ...record.dataToUpdate,
                updatedAt : new Date(),
                updatedBy : userId
                };
                delete updateRecord._id;
                console.log('---------Updated record -----------', updateRecord);
                return this.modelType.create(updateRecord);
        }
        return result;
    }

    public async delete(record): Promise<object> {
        console.log('----------IN VERSIONABLE REPO---------', record);
        const {id, userId} = record;
        const query = {originalId : id, deletedBy: undefined};
        const update = {deletedAt : new Date() , deletedBy: userId};
        return await this.modelType.findOneAndUpdate(query, update, {new: false}).lean();
    }

    public async get(id): Promise<object> {
        console.log('----------IN  VERSIONABLE REPO-----------');
        const query = {originalId: id, deletedAt: undefined};
        return await this.modelType.findOne(query).lean();
    }
}

export default VersionableRepository;