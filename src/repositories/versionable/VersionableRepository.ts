import * as mongoose from 'mongoose';

class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D> > {

    private modelType: M;
    constructor(model) {
        this.modelType = model;
    }

    public getObjectId() {
        return String(mongoose.Types.ObjectId);
    }

    public create(data): Promise<D> {
        console.log('----------IN VERSIONABLE REPO---------', data);
        const record = {
            ...data,
            createdAt : Date.now(),
            createdBy : data.name,
            originalId: data.id
        };
        console.log(record);
        return this.modelType.create(record);
    }

    public update(id, data): Promise<D> {
        console.log('----------IN VERSIONABLE REPO---------', data);
        this.modelType.findOne({id}).then(result => {
            console.log('result Set', result);
        });
        const record = {
            ...data,
            updatedAt : Date.now(),
            updatedBy : data.name,
            originalId: data.id
        };
        return this.modelType.create(record);
    }

}

export default VersionableRepository;