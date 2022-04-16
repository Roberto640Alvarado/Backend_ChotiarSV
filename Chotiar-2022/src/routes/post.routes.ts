import app from '@server';
import { Router,Request,Response } from 'express';
import postController from 'src/controllers/post.controller';

const baseRouter = Router();

//Peticiones a base del Router
baseRouter.post('/create', postController.create);
baseRouter.get('/getAll', postController.getAll);
baseRouter.get('/getOne/:_id', postController.getOne);
baseRouter.delete('/delete/:_id', postController.delete);
baseRouter.get('/search/:title', postController.search);


const postRouter = Router();
postRouter.use('/posts', baseRouter);

export default postRouter;