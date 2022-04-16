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
    }
}
export default postController;