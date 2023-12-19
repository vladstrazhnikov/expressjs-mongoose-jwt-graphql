import Router from 'express';
import AuthController from '../controllers/auth.controller.js';
import { check } from 'express-validator';

const authRouter = new Router();
const authController = new AuthController();

authRouter.post('/signup', [
    check('username', 'Username must not be empty').notEmpty(),
    check('password', 'Password must be at least 6 symbols').isLength({ min: 6, max: 16 }),
], authController.signup);
authRouter.post('/signin', authController.signin);
authRouter.get('/users', authController.getUsers);

export default authRouter;