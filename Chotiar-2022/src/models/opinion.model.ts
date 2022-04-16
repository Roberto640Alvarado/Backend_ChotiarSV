import { model, Schema } from 'mongoose';

const Opinion: Schema = new Schema({
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'user'
    }
});

export default model('opinion',Opinion);