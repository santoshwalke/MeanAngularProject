import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let recipSchema = new Schema({
    '_id': mongoose.Schema.Types.ObjectId,
    'name': {
        type: String,
        required: true
    },
    'description': {
        type: String,
        required: true
    },
    'imagePath': {
        type: String,
        required: true
    },
    'ingredients': [{
        'name': {
            type: String,
            required: true
        },
        'amount': {
            type: String,
            required: true
        }
    }]
});

export default mongoose.model('Recipes', recipSchema, 'recipe');