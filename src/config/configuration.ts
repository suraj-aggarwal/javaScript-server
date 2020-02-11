import IConfig from './IConfig';
import { config } from 'dotenv';

config();
const configuration: IConfig = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
<<<<<<< Updated upstream
    SECRECT_KEY: process.env.SECRECT_KEY,
    MONGO_URL: process.env.MONGO_URL
=======
>>>>>>> Stashed changes
};

Object.freeze(configuration);
export default configuration;