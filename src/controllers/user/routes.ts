import Controller from './Controller';
import { Router } from 'express';
import validate from './validation';
import validateTrainee from '../../libs/routes/validationHandler';
import authMiddlerWare from '../../libs/routes/authMiddlerWare';

const userRoute = Router();
console.log('------------TRAINEE ROUTER---------');
userRoute.get('/me', Controller.userProfile)
    .post('/login', Controller.login);
export default userRoute;
