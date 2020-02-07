import * as mongoose from 'mongoose';

class Database {

    static open = (uri: string) => new Promise( (resolve, reject)  => {
        mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true }, (err) => { 
            if (err) {
                reject('connnection failed');
            } else {
                resolve('connection is successfull');
            }
        });
    });
}

export default Database.open;