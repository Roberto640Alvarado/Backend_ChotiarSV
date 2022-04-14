import { Request, Response } from "express";
//import jwt, { JwtPayload } from 'jsonwebtoken'
import User from "../models/user.model";

const userController = {
    //Registramos un nuevo usuario
    register: async(req: Request, res: Response) => {
        try {
            const {username,password,role} = req.body as any;

            if(username === ''||password === '')
              throw{ status: 400,message: 'Empty fields'};

            const existingUser = await User.findOne({username});

            if(existingUser)
              throw{ status: 400,message: 'Username already taken'};

            const newUser = new User ({
                username,
                password,
                role
            });

            await newUser.save();

            return res.status(201).json({message: 'Done', content: newUser});

        } catch (error: any) {
            return res.status(error.status ?? 400).json({message: error.message ?? JSON.stringify(error)});
        }
    }
}
export default userController;