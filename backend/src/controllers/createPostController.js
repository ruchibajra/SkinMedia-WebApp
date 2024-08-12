const Post = require("../models/createPostModel");
const domain = "http://localhost:5000";

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  console.log(error);
  res.status(500).json({ msg: error.message });
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const {
      title,
      description,
      productName,
      source,
      skintype,
      productUsedTime,
      username
    } = req.body;

    let postData = {
      title,
      description,
      productName,
      source,
      skintype,
      productUsedTime,
      username
    };
    // console.log(req.body);
    // console.log(req.file);
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

// Update a product (Admin Only)
const updatePost = async (req, res) => {
  try {
    const {
      title,
      description,
      productName,
      source,
      skintype,
      productUsedTime,
      username,
      // userId

      

    } = req.body;
    let updatePostData = {
      title,
      description,
      productName,
      source,
      skintype,
      productUsedTime,
      username,
      // userId

    };

    if (req.file) {
      const productImage = `${domain}/uploads/posts/${req.file.filename}`;
      updatePostData.productImage = productImage;
    }

    const post = await Post.findByIdAndUpdate(req.params.id, updatePostData, {
      new: true,
    });
    console.log(post);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(200).json({
      msg: "Post updated successfully",
      post: post,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Delete a product (Admin Only)
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res
      .status(200)
      .json({ msg: "Post deleted successfully", success: true });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// controller for getting all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res
      .status(200)
      .json({ msg: "posts fetched successfully", posts });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


// controller for getting a single post through id

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res
      .status(200)
      .json({ msg: "Post fetched successfully", post });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = { createPost, updatePost, deletePost, getPosts, getPost };
