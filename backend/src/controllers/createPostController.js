const Post = require("../models/createPostModel");
const domain = "http://localhost:5000";

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  console.log(error);
  res.status(500).json({ msg: error.message });
};

// Create a new post (Admin Only)
const createPost = async (req, res) => {
  try {
    const {
      title,
      description,
      productName,
      source,
      skintype,
      productUsedTime,
    } = req.body;

    let postData = {
      title,
      description,
      productName,
      source,
      skintype,
      productUsedTime,
    };
    console.log(req.body)
console.log(req.file)
    if (req.file) {
      const productImage = `${domain}/uploads/posts/${req.file.filename}`;
      postData.productImage = productImage;
    }

    const post = new Post(postData);
    await post.save();

    res.status(201).json({
      msg: "Post created successfully",
      post: post,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = { createPost };
