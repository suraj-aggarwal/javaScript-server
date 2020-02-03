import Controller from './Controller';
import { Router } from 'express';

const traineeRoute = Router();

traineeRoute.get('/', Controller.listTrainee)
    .post('/', Controller.addTrainee)
    .put('/', Controller.updateTrainee)
    .delete('/', Controller.deleteTrainee);
export default traineeRoute;
