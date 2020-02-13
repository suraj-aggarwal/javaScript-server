import * as mongoose from 'mongoose';
import { IVersionableDocument } from './IversionableDocument';
export class VersionableSchema extends mongoose.Schema {
    constructor(schema, options) {
        const genericSchema = new mongoose.Schema({
            createdBy: {type: String},
            deletedBy: String,
            updatedBy: String,
            createdAt: Date,
            deletedAt: Date,
            updatedAt: Date,
            originalId: String,
            ...schema
        });
        super(genericSchema, options);
    }
}