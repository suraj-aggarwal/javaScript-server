import Controller from './Controller';
import { Router } from 'express';
import validate from './validation';
import validateTrainee from '../../libs/routes/validationHandler';
import authMiddlerWare from '../../libs/routes/authMiddlerWare';

const traineeRoute = Router();
console.log('------------TRAINEE ROUTER---------');
/**
 * @swagger
 * /trainee/all:
 *    get:
 *      tags:
 *      - Trainee
 *      security:
 *        - bearerAuth: []
 *      tag:
 *        -trainnee
 *      description: Return the list of trainees
 *      consumes:
 *        - applicaiton/json
 *      produces:
 *        - application/json
 *      parameters:
 *         - name: skip
 *           in: field
 *         - name: limit
 *           in: field
 *         - name: sort
 *           in: field
 *         - name: name
 *           in: field
 *           schema:
 *              type: string
 *      responses:
 *        '200':
 *          description: OK
 *          schema:
 *            $ref: '#/definitions/trainee'
 *        '404':
 *          description: not found
 * definitions:
 *      trainee:
 *        properties:
 *          count: 1
 *          name:
 *            type: string
 *            example: suraj aggarwal
 *          email:
 *            type: string
 *            example: suraj@gmail.com
 *          dob:
 *            type: date
 *            example: 12/09/1998
 *          role:
 *            type: string
 *            example: trainee
 *          mod:
 *            type: integer
 *            example: 9910236789
 *          hobbies:
 *            type: array
 *            example: ['music','football']
 *          createdAt:
 *            type: Date
 *            example: 2020-03-13T11:16:37.362Z
 *          createdBy:
 *            type: string
 *            example: 5e6b6b95ae038067d9456797
 */
traineeRoute
.get('/all', authMiddlerWare('getUsers', 'read'), validateTrainee(validate.list), Controller.list)

/**
 * @swagger
 * /trainee:
 *    post:
 *      tags:
 *      - Trainee
 *      security:
 *        - bearerAuth: []
 *      tag:
 *        - trainnee
 *      description: create a trainee
 *      consumes:
 *        - application/json
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
    .post('/', authMiddlerWare('getUsers', 'write'), validateTrainee(validate.create), Controller.create)
/**
 * @swagger
 * /trainee:
 *    put:
 *      tags:
 *      - Trainee
 *      security:
 *        - bearerAuth: []
 *      tag:
 *        - trainnee
 *      description: create a trainee
 *      produces:
 *        -application/json
 *      parameters:
 *        - name: Request Body
 *          desciption: data to update a trianee
 *          in: body
 *          required: true
 *        - name: id
 *          in: field
 *          required: true
 *        - name: dataToUpdate
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
    .put('/', authMiddlerWare('getUsers', 'update'), validateTrainee(validate.update), Controller.update)
/**
 * @swagger
 * /trainee/{id}:
 *    delete:
 *      tags:
 *      - Trainee
 *      security:
 *        - bearerAuth: []
 *      tag:
 *        -trainnee
 *      description: create a trainee
 *      produces:
 *        -application/json
 *      parameters:
 *        - name: id
 *          desciption: delete a specific trainee
 *          in: params
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
    .delete('/:id', authMiddlerWare('getUsers', 'delete'), validateTrainee(validate.delete), Controller.delete)
    .get('/search', authMiddlerWare('getUsers', 'read'), Controller.search);
export default traineeRoute;
