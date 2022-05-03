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
    valueUser: {
        type: Number,
        default: 0
    },
    location: {
        type: String,
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId, ref: 'comment'
    },
    places: {
        type: Schema.Types.ObjectId, ref: 'place'
    }
});

export default model('post',Post);