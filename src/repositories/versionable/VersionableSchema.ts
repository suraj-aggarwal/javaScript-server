import * as mongoose from 'mongoose';
export class VersionableSchema extends mongoose.Schema {
    constructor(schema, options) {
        const genericSchema = new mongoose.Schema({
            createdBy: {
                type: String,
                required: true,
            },
            deletedBy: {
                type:  String,
                required: false
            },
            updatedBy: {
                type:  String,
                required: false
            },
            createdAt: {
                type: Date,
                required: true,
                default: Date.now
            },
            deletedAt: {
                type:  String,
                required: false
            },
            updatedAt: {
                type:  String,
                required: false
            },
            originalId: {
                type: String,
                required: true,
            },
            ...schema
        });
        super(genericSchema, options);
    }
}