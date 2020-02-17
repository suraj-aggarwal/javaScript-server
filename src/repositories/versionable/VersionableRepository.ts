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
            ...data,
            createdAt : Date.now(),
            createdBy : data._authId,
            originalId: this.getObjectId()
        };
        return this.modelType.create(record);
    }

    public async update(record): Promise<D> {
    console.log('----------IN VERSIONABLE REPO---------', record);
    const query = {originalId : record.originalId, deletedBy: undefined};
    const update = {deletedAt : Date.now(), deletedBy: record._authId};
    const result = await this.modelType.findOneAndUpdate(query, update);
    const doc = result.toJSON();
        const updateRecord = {
            ...doc,
            ...record.dataToUpdate,
            updatedAt : Date.now(),
            updatedBy : record._authId,
            originalId: doc.originalId
            };
            delete updateRecord._id;
            delete updateRecord.deletedAt;
            delete updateRecord.deletedBy;
            console.log('---------Updated record -----------', updateRecord);
            return this.modelType.create(updateRecord);
    }

    public async delete(deleteRecord): Promise<D> {
        console.log('----------IN VERSIONABLE REPO---------', deleteRecord);
        const query = {originalId : deleteRecord.recordId, deletedBy: undefined};
        const update = {deletedAt : Date.now(), deletedBy: deleteRecord._authId};
        return await this.modelType.findOneAndUpdate(query, update);
    }

    public async IsEmailExits(email): Promise<D> {
        console.log('---------IS EXITS-------------');
        return await this.modelType.findOne({email});
    }
}

export default VersionableRepository;