import Controller from './Controller';
import { Router } from 'express';
import authMiddlerWare from '../../libs/routes/authMiddlerWare';

const userRoute = Router();

console.log('------------TRAINEE ROUTER---------');
/**
 * @swagger
 * /user/me:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Users
 *      name: Login
 *      summary: Logs in a user
 *      produces:
 *        - application/json
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: token
 *          in: header
 *          required: true
 *      responses:
 *          200:
 *            description: user found and logged sucessfully
 *          401:
 *            description: Bad user name not found in db
 *          403:
 *            description: user and password did'nt match
 */
userRoute.get('/me', authMiddlerWare('getUsers', 'read'), Controller.userProfile)
/**
 * @swagger
 * /user/login:
 *    post:
 *      tags:
 *        - Users
 *      name: Login
 *      summary: Logs in a user
 *      produces:
 *        - application/json
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          properties:
 *              email:
 *                 type: string
 *              password:
 *                 type: string
 *                 format: password
 *          required:
 *             - email
 *             - password
 *      responses:
 *          200:
 *            description: user found and logged sucessfully
 *          401:
 *            description: Bad user name not found in db
 *          403:
 *            description: user and password did'nt match
 */
    .post('/login', Controller.login);
export default userRoute;
