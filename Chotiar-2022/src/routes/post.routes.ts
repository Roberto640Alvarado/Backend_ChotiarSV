import app from '@server';
import { Router,Request,Response } from 'express';
import postController from 'src/controllers/post.controller';

const baseRouter = Router();

//Peticiones a base del Router
baseRouter.post('/create', postController.create);


const postRouter = Router();
postRouter.use('/posts', baseRouter);

export default postRouter;