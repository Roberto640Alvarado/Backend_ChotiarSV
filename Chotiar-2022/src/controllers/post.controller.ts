import { Request, Response } from "express";
import Post from "../models/post.model";

const postController = {
    //Creamos un nuevo post
    create: async (req: Request, res: Response) => {
        try {
            console.log(req.body);

            //nuevo post
            const newPost = new Post({ ...req.body });

            await newPost
                .save()
                .then((newPost: any) => {
                    return res.status(201).json({ message: 'Done', content: newPost });
                })

        } catch (error: any) {
            return res.status(error.status ?? 400).json({ message: error.message ?? JSON.stringify(error) });
        }
    },
    //Obtenemos todos los posts
    getAll: async (req: Request, res: Response) => {

        //Paginacion
        const { page, limit } = req.query;
        const pageNumber = +(page as string);
        const limitNumber = +(limit as string);

        const post = await Post
            .find()
            .limit(+limitNumber)
            .skip((pageNumber - 1) * limitNumber);

        const postCount = await Post.countDocuments();//Cantidad de post

        const pagingInfo = {
            total: postCount,
            page: pageNumber,
            perpage: limitNumber,
            pages: Math.ceil(postCount / limitNumber)
        }

        return res.status(201).json({ message: 'Success', content: post, pagingInfo });

    },
    //Obtener solo un post
    getOne: async (req: Request, res: Response) => {
        try {
            return res.status(200).json({
                message: "Done",
                content: await Post.findOne({ _id: req.params._id })
            })

        } catch (err: any) {
            return res
                .status(err.status as number ?? 400)
                .json({ message: err.message ?? JSON.stringify(err) });
        }
    },
    //Eliminar un post
    delete: async (req: Request, res: Response) => {
        try {
            return res.status(200).json({
                message: "Done",
                content: await Post.findOneAndDelete({ _id: req.params._id })
            })

        } catch (err: any) {
            return res
                .status(err.status as number ?? 400)
                .json({ message: err.message ?? JSON.stringify(err) });
        }
    },
    //Buscar post por Titulo
    search: async (req: Request, res: Response) => {
        try {

            const { title } = req.params;
            Post.find({ title: { $regex: title, $options: "i" } })
                .then((posts) => res.status(200).json({ posts }))

        } catch (error: any) {
            return res
                .status(error.status as number ?? 400)
                .json({ message: error.message ?? JSON.stringify(error) });
        }
    }
}
export default postController;