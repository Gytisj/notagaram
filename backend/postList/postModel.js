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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

let postModel = mongoose.model('postList', postSchema);

module.exports = postModel; 