const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    date :{
        type: Number,
    },
    imageURL: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    username: {
        type: String
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    latestComments: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'commentList'
    }]
});

const postModel = mongoose.model('postList', postSchema);

module.exports = postModel; 