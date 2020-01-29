const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  date: {
    type: Number
  },
  imageURL: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    }
  ],
  username: {
    type: String
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const postModel = mongoose.model("postList", postSchema);

module.exports = postModel;
