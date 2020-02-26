import Controller from './Controller';
import { Router } from 'express';
import validate from './validation';
import validateTrainee from '../../libs/routes/validationHandler';
import authMiddlerWare from '../../libs/routes/authMiddlerWare';

const traineeRoute = Router();
console.log('------------TRAINEE ROUTER---------');

/**
 * @swagger
 * /trainee:
 *    get:
 *      security:
 *        -Bearer: []
 *      tag:
 *        -trainnee
 *      description: Return the list of trainees
 *      produces:
 *        -application/json
 *      responses:
 *        '200':
 *          description: OK
 *          schema:
 *            $ref: '#/definitions/trainee'
 *        '403':
 *          description: not found
 * definitions:
 *      trainee:
 *        properties:
 *          name:
 *            type: string
 *            example: suraj aggarwal
 *          email:
 *            type: string
 *            example: suraj@gmail.com
 *          dob:
 *            type: date
 *            example: 12/09/1998
 */
traineeRoute
  .get(
    '/',
    authMiddlerWare('getUsers', 'read'),
    validateTrainee(validate.get),
    Controller.listTrainee
  )

/**
 * @swagger
 * /trainee:
 *    post:
 *      security:
 *        - Bearer: []
 *      tag:
 *        - trainnee
 *      description: create a trainee
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: Request Body
 *          desciption: data to create a trianee
 *          in: body
 *          required: true
 *          schema:
 *              $ref: '#/definitions/trainee'
 *      responses:
 *        '200':
 *          description: Trainee created successfully
 *          schema:
 *            $ref: '#/definitions/postTrainee'
 *        '403':
 *          description: not found
 * definitions:
 *      postTrainee:
 *          properties:
 *            message:
 *              type: string
 *              example: trainee created successfully
 *            status:
 *              type: number
 *              example: 200
 *            trainee:
 *              type: trainee
 *              example:
 *                $ref: '#/definitions/trainee'
 */
  .post(
    '/',
    authMiddlerWare('getUsers', 'read'),
    validateTrainee(validate.create),
    Controller.addTrainee
  )
/**
 * @swagger
 * /trainee:
 *    put:
 *      security:
 *        - Bearer: []
 *      tag:
 *        - trainnee
 *      description: create a trainee
 *      produces:
 *        -application/json
 *      parameters:
 *        - name: Request Body
 *          desciption: data to update a trianee
 *          in: body`
 *          required: true
 *        - name: skip
 *          in: field
 *          required: true
 *      responses:
 *        '200':
 *          description: Trainee updated successfully
 *          schema:
 *            $ref: '#definitions/updateTrainee'
 *        '403':
 *          description: not found
 *
 * definitions:
 *      updateTrainee:
 *            properties:
 *                id:
 *                  type: string
 *                  example: 5e54c7b966a40353e120bc2a
 *                dataToUpdate:
 *                  type: object
 *                  example: {"name": Ayushi}
 */
  .put(
    '/',
    authMiddlerWare('getUsers', 'read'),
    validateTrainee(validate.update),
    Controller.updateTrainee
  )
/**
 * @swagger
 * /trainee/{id}:
 *    delete:
 *      security:
 *        -Bearer: []
 *      tag:
 *        -trainnee
 *      description: create a trainee
 *      produces:
 *        -application/json
 *      parameters:
 *          -name: id
 *          desciption: delete a specific trainee
 *          in: path
 *          required: true
 *      responses:
 *        '200':
 *          description: Trainee created successfully
 *          schema:
 *            $ref: '#/definitions/deleteResponse'
 *        '403':
 *          description: not found
 * definitions:
 *     deleteResponse:
 *        properties:
 *            message:
 *              type: string
 *              example: trainee deleted successfully
 *            status:
 *              type: number
 *              example: 200
 *            id:
 *              type: string
 *              example: "5e54c7b966a40353e120bc2a"
 */
  .delete(
    '/:id',
    authMiddlerWare('getUsers', 'read'),
    validateTrainee(validate.delete),
    Controller.deleteTrainee
  );
export default traineeRoute;
