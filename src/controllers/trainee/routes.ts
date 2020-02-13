import Controller from './Controller';
import { Router } from 'express';
import validate from './validation';
import validateTrainee from '../../libs/routes/validationHandler';

const traineeRoute = Router();
console.log('------------TRAINEE ROUTER---------');
traineeRoute.get('/', validateTrainee(validate.get), Controller.listTrainee)
    .post('/', validateTrainee(validate.create), Controller.addTrainee)
    .put('/', validateTrainee(validate.update), Controller.updateTrainee)
    .delete('/:id', validateTrainee(validate.delete), Controller.deleteTrainee);

export default traineeRoute;
