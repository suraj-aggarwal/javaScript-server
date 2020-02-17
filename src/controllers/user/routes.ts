import Controller from './Controller';
import { Router } from 'express';
import validate from './validation';
import validateTrainee from '../../libs/routes/validationHandler';
import authMiddlerWare from '../../libs/routes/authMiddlerWare';

const userRoute = Router();
console.log('------------TRAINEE ROUTER---------');
userRoute.get('/', authMiddlerWare('getUsers', 'read'), validateTrainee(validate.get), Controller.listUsers)
    .post('/', authMiddlerWare('getUsers', 'write'), validateTrainee(validate.create), Controller.addUser)
    .put('/', authMiddlerWare('getUsers', 'write'),  validateTrainee(validate.update), Controller.updateUser)
    .delete('/:id', authMiddlerWare('getUsers', 'delete'), validateTrainee(validate.delete), Controller.deleteUser)
    .get('/me', authMiddlerWare('getUsers', 'read'), Controller.userProfile)
    .get('/login', Controller.login);

export default userRoute;
