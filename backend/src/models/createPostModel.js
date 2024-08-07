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
  },
});

const createPost = mongoose.model("Post", createPostSchema);
module.exports = createPost;
