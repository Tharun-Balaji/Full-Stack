const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    poster: {
        type: Number,
        required: true
    },
    releasedDate: {
        type: Date,
        required: true
    }
})


module.exports = mongoose.model('movie', movieSchema);