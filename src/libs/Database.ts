import * as mongoose from 'mongoose';

class Database {

    static open = (uri: string) => new Promise( (resolve, reject)  => {
        mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true }, (err) => {
            if (err) {
                console.log('database connection failed.');
                reject('database connnection failed');
            } else {
                console.log('database connection successfull.');
                resolve('connection is successfull');
            }
        });
    });

    static disconnect = () => {
        mongoose.disconnect();
    }
}

export default Database;