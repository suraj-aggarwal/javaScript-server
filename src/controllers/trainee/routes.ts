import Controller from './Controller';
import { Router } from 'express';
import validate from './validation';
import validateTrainee from '../../libs/routes/validationHandler';
import authMiddlerWare from '../../libs/routes/authMiddlerWare';

const traineeRoute = Router();
console.log('------------TRAINEE ROUTER---------');
traineeRoute.get('/', /*authMiddlerWare('getUsers', 'read')*/ validateTrainee(validate.get), Controller.listTrainee)
    .post('/', validateTrainee(validate.create), Controller.addTrainee)
    .put('/', validateTrainee(validate.update), Controller.updateTrainee)
    .delete('/', validateTrainee(validate.delete), Controller.deleteTrainee);

export default traineeRoute;
