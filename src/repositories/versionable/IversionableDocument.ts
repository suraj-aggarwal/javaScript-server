import * as mongoose from 'mongoose';

export interface IVersionableDocument extends mongoose.Document {
    createdBy: string;
    deletedBy: string;
    updatedBy: string;
    createdAt: Date;
    deletedAt: Date;
    updatedAt: Date;
    originalId: string;
}

