import mongoose from 'mongoose';

const bcrypt = require('bcryptjs');
import validator from 'validator';

const Schema = mongoose.Schema;

let userSchema = new Schema({
    'email': {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: email => validator.isEmail(email),
            message: '{VALUE} is not a valid email'
          }
    },
    'password': {
        type: String,
        required: true
    }
});

export default mongoose.model('User', userSchema, 'user');