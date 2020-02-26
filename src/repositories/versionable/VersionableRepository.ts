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

    public async update(record): Promise<object> {
    console.log('----------IN VERSIONABLE REPO---------', record);
    const result = await this.delete({id: record.id, _authId: record._authId});
        if (result) {
            const updateRecord = {
                ...result,
                ...record.dataToUpdate,
                updatedAt : Date.now(),
                updatedBy : record._authId,
                originalId: result['originalId']
                };
                delete updateRecord._id;
                console.log('---------Updated record -----------', updateRecord);
                return this.modelType.create(updateRecord);
        }
        return result;
    }

    public async delete(record): Promise<object> {
        console.log('----------IN VERSIONABLE REPO---------', record);
        const {id, _authId} = record;
        const query = {originalId : id, deletedBy: undefined};
        const update = {deletedAt : Date.now(), deletedBy: _authId};
        return await this.modelType.findOneAndUpdate(query, update, {new: false}).lean();
    }
}

export default VersionableRepository;