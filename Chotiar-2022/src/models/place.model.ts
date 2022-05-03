import { model, Schema } from 'mongoose';

const Place: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timetable: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

export default model('place',Place);