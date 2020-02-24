import Controller from './Controller';
import { Router } from 'express';
import validate from './validation';
import validateTrainee from '../../libs/routes/validationHandler';
import authMiddlerWare from '../../libs/routes/authMiddlerWare';
import swaggerSpecs from '../../swagger';
import * as swaggerUi from 'swagger-ui-express';

const traineeRoute = Router();
console.log('------------TRAINEE ROUTER---------');
console.log(swaggerSpecs);
traineeRoute.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

/**
 *  @swagger
 *  paths:
 *     /api/trainee:
 *        put:
 *          tags:
 *          - trainee
 *          summary: update an exiting trainee
 *          requestBody:
 *          description: update an exiting trainee
 *          content:
 *              application/json:
 *          required: true
 *          responses:
 *          200:
 *              description: successfull
 *              content: {}
 *          404:
 *              description: Invalid Id
 *
 */

traineeRoute.get('/', authMiddlerWare('getUsers', 'read'), validateTrainee(validate.get), Controller.listTrainee)
    .post('/', authMiddlerWare('getUsers', 'read'), validateTrainee(validate.create), Controller.addTrainee)
    .put('/', authMiddlerWare('getUsers', 'read'), validateTrainee(validate.update), Controller.updateTrainee)
    .delete('/:id', authMiddlerWare('getUsers', 'delete'), validateTrainee(validate.delete), Controller.deleteTrainee)
    .get('/search', Controller.search);



export default traineeRoute;
