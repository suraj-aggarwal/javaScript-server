import Controller from './Controller';
import { Router } from 'express';
import validate from './validation';
import validateTrainee from '../../libs/routes/validationHandler';
import authMiddlerWare from '../../libs/routes/authMiddlerWare';

const userRoute = Router();
userRoute.get('/:id', authMiddlerWare('getUsers', 'read'), validateTrainee(validate.get), Controller.user)
    .post('/', authMiddlerWare('getUsers', 'write'), validateTrainee(validate.create), Controller.create)
    .put('/', authMiddlerWare('getUsers', 'write'),  validateTrainee(validate.update), Controller.update)
    .delete('/:id', authMiddlerWare('getUsers', 'delete'), validateTrainee(validate.delete), Controller.delete)
    .get('/me', authMiddlerWare('getUsers', 'read'), Controller.userProfile);

export default userRoute;
