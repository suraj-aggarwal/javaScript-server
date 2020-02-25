import Controller from './Controller';
import { Router } from 'express';
import validate from './validation';
import validateTrainee from '../../libs/routes/validationHandler';
import authMiddlerWare from '../../libs/routes/authMiddlerWare';

const traineeRoute = Router();
console.log('------------TRAINEE ROUTER---------');
traineeRoute.get('/', authMiddlerWare('getUsers', 'read'), validateTrainee(validate.get), Controller.listTrainee)
    .post('/', authMiddlerWare('getUsers', 'read'), validateTrainee(validate.create), Controller.addTrainee)
    .put('/', authMiddlerWare('getUsers', 'read'), validateTrainee(validate.update), Controller.updateTrainee)
    .delete('/:id', authMiddlerWare('getUsers', 'read') , validateTrainee(validate.delete), Controller.deleteTrainee);
export default traineeRoute;
