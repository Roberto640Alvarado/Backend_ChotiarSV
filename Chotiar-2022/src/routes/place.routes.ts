import { Router } from 'express';
import placeController from 'src/controllers/place.controller';

const baseRouter = Router();

//Peticiones a base del Router
baseRouter.post('/create', placeController.create);
baseRouter.delete('/delete/:_id', placeController.delete);
baseRouter.get('/getAll', placeController.getAll);
baseRouter.get('/getOne/:_id', placeController.getOne);
baseRouter.put('/update/:_id', placeController.update);

const placeRouter = Router();
placeRouter.use('/places', baseRouter);

export default placeRouter;