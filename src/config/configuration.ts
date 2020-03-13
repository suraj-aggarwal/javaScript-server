import IConfig from './IConfig';
import { config } from 'dotenv';

config();
const configuration: IConfig = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_URL: process.env.MONGO_URL,
    PASSWORD: process.env.PASSWORD,
    SECRET_KEY: process.env.SECRET_KEY,
};
Object.freeze(configuration);
export default configuration;