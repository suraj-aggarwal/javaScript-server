import * as mongoose from 'mongoose';
import { seedData } from './seedData';

class Database {

    static open = (uri: string) => new Promise( (resolve, reject)  => {
        mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true }, (err) => {
            if (err) {
                console.log(err.message);
                return reject('connnection failed');
            } else {
                console.log('connection is successfull');
                seedData();
                return resolve('connection is successfull');
            }
        });
    });

    static disconnect = () => {
        mongoose.disconnect();
    }
}

export default Database;