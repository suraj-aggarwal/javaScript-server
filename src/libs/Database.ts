import * as mongoose from 'mongoose';
import { seedData } from './seedData';

class Database {

    static open = (uri: string) => new Promise( (resolve, reject)  => {
        mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true }, (err) => {
            if (err) {
                reject('database connnection failed');
            } else {
                seedData();
                resolve('connection is successfull');
            }
        });
    });

    static disconnect = () => {
        mongoose.disconnect();
    }
}

export default Database;