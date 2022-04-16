import app from '@server';
import { Router,Request,Response } from 'express';
import userController from 'src/controllers/user.controller';

const baseRouter = Router();

//Peticiones a base del Router
baseRouter.post('/register', userController.register);
baseRouter.post('/login', userController.login);

const userRouter = Router();
userRouter.use('/users', baseRouter);

export default userRouter;