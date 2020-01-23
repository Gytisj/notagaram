const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    imageURL: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

let postModel = mongoose.model('postList', postSchema);

module.exports = postModel; 