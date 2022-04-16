import { Request, Response } from "express";
import User from "../models/user.model";

//Encriptar la contraseña y generar Token
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userController = {
    //Registramos un nuevo usuario
    register: async (req: Request, res: Response) => {
        try {
            const { username, email, password, userType } = req.body as any;

            //Encriptamiento de la contraseña
            const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
            const hash = bcrypt.hashSync(password, salt, null);

            //Verificando si viene vacio el body
            if (username === '' || email === '' || password === '')
                throw { status: 400, message: 'Empty fields' };

            const existingUser = await User.findOne({ username });

            if (existingUser)
                throw { status: 400, message: 'Username already taken' };

            //nuevo usuario
            const newUser = new User({
                username,
                email,
                password: hash,
                userType: userType || "user"
            });

            await newUser
                .save()
                .then((newCustomer: any) => {
                    const payload = {
                        id: newCustomer._id,
                        userType: newCustomer.userType,
                    }

                    const token = jwt.sign(payload, process.env.TOKEN_KEY as string);

                    return res.status(201).json({ message: 'Done', content: token });
                })

        } catch (error: any) {
            return res.status(error.status ?? 400).json({ message: error.message ?? JSON.stringify(error) });
        }
    },
    //Inicio de sesion
    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body as any;
            const user = await User.findOne({ email });

            //Correo no encontrado
            if (!user)
                throw { status: 404, message: 'Email not found' };

            //Contraseña incorrecta 
            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(401).json({
                    message: "Email or password is wrong",
                });
            }

            const payload = {
                id: user._id,
                userType: user.userType,
            }

            const token = jwt.sign(payload, process.env.TOKEN_KEY as string);

            return res.status(200).json({ message: "Done", content: token });

        } catch (error: any) {
            return res.status(error.status ?? 400).json({ message: error.message ?? JSON.stringify(error) });
        }

    }
}
export default userController;