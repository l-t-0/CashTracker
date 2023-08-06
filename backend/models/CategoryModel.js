const mongoose = require('mongoose');

const CategoryModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    type: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Categories', CategoryModelSchema)
