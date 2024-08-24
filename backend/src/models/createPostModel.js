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

  likes: [String], // Array of usernames or user IDs




  comments: [commentSchema], // Embed comments
});

const Post = mongoose.model("Post", createPostSchema);
module.exports = Post;