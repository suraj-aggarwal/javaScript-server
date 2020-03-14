import Controller from './Controller';
import { Router } from 'express';
import validate from './validation';
import validateTrainee from '../../libs/routes/validationHandler';
import authMiddlerWare from '../../libs/routes/authMiddlerWare';

const traineeRoute = Router();
console.log('------------TRAINEE ROUTER---------');
traineeRoute.get('/all', authMiddlerWare('getUsers', 'read'), validateTrainee(validate.list), Controller.list)
    .post('/', authMiddlerWare('getUsers', 'write'), validateTrainee(validate.create), Controller.create)
    .put('/', authMiddlerWare('getUsers', 'write'), validateTrainee(validate.update), Controller.update)
    .delete('/:id', authMiddlerWare('getUsers', 'delete'), validateTrainee(validate.delete), Controller.delete)
    .get('/', authMiddlerWare('getUsers', 'read'), Controller.search);

export default traineeRoute;
