import Controller from './Controller';
import { Router } from 'express';
<<<<<<< HEAD
import validate from './validation';
import validateTrainee from '../../libs/routes/validationHandler';

const traineeRoute = Router();
console.log('------------TRAINEE ROUTER---------');
traineeRoute.get('/', validateTrainee(validate.get), Controller.listTrainee)
    .post('/', validateTrainee(validate.create), Controller.addTrainee)
    .put('/', validateTrainee(validate.update), Controller.updateTrainee)
    .delete('/:id', validateTrainee(validate.delete), Controller.deleteTrainee);
=======

const traineeRoute = Router();

traineeRoute.get('/', Controller.listTrainee)
    .post('/', Controller.addTrainee)
    .put('/', Controller.updateTrainee)
    .delete('/', Controller.deleteTrainee);
>>>>>>> 2d22f91d586db6234a68fe1dc7957bf7a766f134

export default traineeRoute;
