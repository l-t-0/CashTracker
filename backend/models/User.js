const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Users', UserSchema)
