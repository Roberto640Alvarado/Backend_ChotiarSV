import { Request, Response } from "express";
import Place from "../models/place.model";

const placeController = {
    //Creamos un nuevo post
    create: async (req: Request, res: Response) => {
        try {
            console.log(req.body);

            //nuevo post
            const newPlace = new Place({ ...req.body });

            await newPlace
                .save()
                .then((newPlace: any) => {
                    return res.status(201).json({ message: 'Done', content: newPlace });
                })

        } catch (error: any) {
            return res.status(error.status ?? 400).json({ message: error.message ?? JSON.stringify(error) });
        }
    },
    //Eliminar un lugar
    delete: async (req: Request, res: Response) => {
        try {

            const place = await Place.findOne({ _id: req.params._id });

            if (!place)
                throw { status: 404, message: 'Place not found' };

            return res.status(200).json({
                message: "Done",
                content: await Place.findOneAndDelete({ _id: req.params._id })
            })

        } catch (err: any) {
            return res
                .status(err.status as number ?? 400)
                .json({ message: err.message ?? JSON.stringify(err) });
        }
    },
    //Obtener todos los lugares
    getAll: async (req: Request, res: Response) => {
            
            //Paginacion
            const { page, limit } = req.query;
            const pageNumber = +(page as string);
            const limitNumber = +(limit as string);
    
            const places = await Place
                .find()
                .limit(+limitNumber)
                .skip((pageNumber - 1) * limitNumber);
    
            const placesCount = await Place.countDocuments();//Cantidad de post
    
            const pagingInfo = {
                total: placesCount,
                page: pageNumber,
                perpage: limitNumber,
                pages: Math.ceil(placesCount / limitNumber)
            }
    
            return res.status(201).json({ message: 'Success', content: places, pagingInfo });
    
    },
    //Obtener solo un lugar
    getOne: async (req: Request, res: Response) => {
        try {

            const place = await Place.findOne({ _id: req.params._id });

            if (!place)
                throw { status: 404, message: 'Place not found' };

            
            return res.status(200).json({message: "Done",content: place});

        } catch (err: any) {
            return res
                .status(err.status as number ?? 400)
                .json({ message: err.message ?? JSON.stringify(err) });
        }
    },
    //Actualizar un lugar
    update: async (req: Request, res: Response) => {
        try {

            const place = await Place.findOne({ _id: req.params._id });

            if (!place)
                throw { status: 404, message: 'Place not found' };

            const updatedPlace = await Place.findOneAndUpdate({ _id: req.params._id }, { ...req.body }, { new: true });

            return res.status(200).json({message: "Done", content: updatedPlace});

        } catch (err: any) {
            return res
                .status(err.status as number ?? 400)
                .json({ message: err.message ?? JSON.stringify(err) });
        }
    }
}

export default placeController;