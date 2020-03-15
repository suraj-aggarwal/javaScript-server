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
 *           in: query
 *         - name: limit
 *           in: query
 *         - name: sort
 *           in: query
 *         - name: name
 *           in: query
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
traineeRoute.get('/all', authMiddlerWare('getUsers', 'read'), validateTrainee(validate.list), Controller.list)

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
 *          in : body
 *          schema:
 *              $ref: '#definitions/updateTrainee'
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
 *              code:
 *                 type: integer
 *                 example:  200
 *              message:
 *                 type: string
 *                 example: trainee updated successfully
 *              schema:
 *                 $ref: '#definitions/trainee'
 */
    .put('/', authMiddlerWare('getUsers', 'write'), validateTrainee(validate.update), Controller.update)
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
 *          in: path
 *          required: true
 *      responses:
 *        '200':
 *          description: Trainee deleted successfully
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
 *            schema:
 *              $ref: '#definitions/trainee'
 */

    .delete('/:id', authMiddlerWare('getUsers', 'delete'), validateTrainee(validate.delete), Controller.delete)
/**
 * @swagger
 * /trainee/search:
 *    get:
 *      tags:
 *      - Trainee
 *      security:
 *        - bearerAuth: []
 *      tag:
 *        -trainnee
 *      description: Return the list of possible users
 *      consumes:
 *        - applicaiton/json
 *      produces:
 *        - application/json
 *      parameters:
 *         - name: name
 *           in: query
 *         - name: email
 *           in: query
 *      responses:
 *        '200':
 *          description: OK
 *          code: 
 *             type: integer
 *             example: 200
 *          count: 
 *              type: integer
 *              example: 1
 *          schema:
 *            $ref: '#/definitions/trainee'
 *        '404':
 *          description: not found
 */
    .get('/search',authMiddlerWare('getUsers', 'delete'),Controller.search);
export default traineeRoute;
