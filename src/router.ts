import { traineeRoutes } from './controllers/trainee';
import { Router } from 'express';
import { userRoutes }  from './controllers/user';

const mainRoute = Router();
mainRoute.use('/trainee', traineeRoutes);
mainRoute.use('/user' , userRoutes);
export default mainRoute;