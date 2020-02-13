import { traineeRoutes } from './controllers/trainee';
import { Router } from 'express';

const mainRoute = Router();

mainRoute.use('/trainee', traineeRoutes);
export default mainRoute;