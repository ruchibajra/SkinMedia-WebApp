const mongoose = require("mongoose");
const { Schema } = mongoose;

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

  // userId: {
  //   type: String,
  //   required: true,
  // },
});

const Post = mongoose.model("Post", createPostSchema);
module.exports = Post;
