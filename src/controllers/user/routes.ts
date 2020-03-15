import Controller from './Controller';
import { Router } from 'express';
import authMiddlerWare from '../../libs/routes/authMiddlerWare';

const userRoute = Router();

console.log('------------TRAINEE ROUTER---------');
userRoute.get('/me', authMiddlerWare('getUsers', 'read'), Controller.userProfile)
    .post('/login', Controller.login);


export default userRoute;
