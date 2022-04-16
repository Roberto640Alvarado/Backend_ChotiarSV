import { model, Schema } from 'mongoose';

const Post: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    opinion: {
        type: Schema.Types.ObjectId, ref: 'opinion'
    },
    valueUser: {
        type: Number,
        default: 0
    }
});

export default model('post',Post);