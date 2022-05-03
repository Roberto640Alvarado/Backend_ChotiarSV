import { model, Schema } from 'mongoose';

const User: Schema = new Schema({
    username: {
        required: true,
        type: String
    },
    email:{
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    userType: {
        required: true,
        type: String,
        enum: ['admin','user'],
        default: 'user'
    },
    valueQuiz: {
        required: true,
        type: Number,
        default: 0
    },
    answer: {
        required: true,
        type: String,
        default: ''
    }

});

export default model('user', User);