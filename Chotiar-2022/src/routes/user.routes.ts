import { Router } from 'express';
import userController from 'src/controllers/user.controller';

const baseRouter = Router();

//Peticiones a base del Router
baseRouter.post('/register', userController.register);
baseRouter.post('/login', userController.login);
baseRouter.get('/getAll', userController.getAll);
baseRouter.get('/getOne/:username', userController.getOne);
baseRouter.put('/updatePassword/:username', userController.updatePassword);
baseRouter.put('/updateQuiz/:_id', userController.updateQuiz);

const userRouter = Router();
userRouter.use('/users', baseRouter);

export default userRouter;