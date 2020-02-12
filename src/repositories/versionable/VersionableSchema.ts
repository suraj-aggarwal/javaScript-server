import * as mongoose from 'mongoose';
import { IVersionableDocument } from './IversionableDocument';
export class VersionableSchema extends mongoose.SchemaType {

    constructor(options) {
        const genericSchema = new mongoose.Schema({
            createdBy: String,
            deletedBy: String,
            updatedBy: String,
            createdAt: Date,
            deletedAt: Date,
            updatedAt: Date,
            ...options
        });
        super(options, genericSchema);
    }
}