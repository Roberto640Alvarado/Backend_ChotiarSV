import mongoose, { model, Schema } from 'mongoose';
import { type } from 'os';

const User: Schema = new Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: String
});

export default model('user', User);