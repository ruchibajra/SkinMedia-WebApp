const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const createPostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  productName: {
    type: String,
    required: true,
  },

  productImage: {
    type: String,
    required: true,
  },

  source: {
    type: String,
    required: true,
  },

  skintype: {
    type: String,
    required: true,
  },

  productUsedTime: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    ref: "User",
    required: true,
  },
  
  comments: [commentSchema], 

  likes: {
    type: [String], 
    default: [],
  },
  
  likeCount: {
    type: Number,
    default: 0,
  },  

});

const Post = mongoose.model("Post", createPostSchema);
module.exports = Post;