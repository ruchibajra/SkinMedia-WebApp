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
      username,
    } = req.body;

    let postData = {
      title,
      description,
      productName,
      source,
      skintype,
      productUsedTime,
      username,

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
    } = req.body;

    let updatePostData = {
      title,
      description,
      productName,
      source,
      skintype,
      productUsedTime,
      username,
    };

    if (req.file) {
      const productImage = `${domain}/uploads/posts/${req.file.filename}`;
      updatePostData.productImage = productImage;
    }

    const post = await Post.findByIdAndUpdate(req.params.id, updatePostData, {
      new: true,
    });

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

    res.status(200).json({ msg: "Post deleted successfully", success: true });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// controller for getting all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({ msg: "posts fetched successfully", posts });
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
    return res.status(200).json({ msg: "Post fetched successfully", post });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// Function to add a comment to a post
const addComment = async (req, res) => {
  try {

    console.log('Request body:', req.body); // Log the request body
    console.log('User data:', req.user); // Log user data

    // Check if req.user is properly set and contains username
    if (!req.user || !req.user.username) {
      return res
        .status(400)
        .json({ msg: "User data is missing or incomplete" });
    }

    // Get the post ID and comment from the request body
    const { postId, text } = req.body; // Change `comment` to `text`

    // Validate that postId and comment are provided
    if (!postId || !text) { // Check for `text` here
      return res.status(400).json({ msg: "Post ID and comment are required" });
    }

    // Find the post by ID
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Add the comment to the post
    post.comments.push({
      username: req.user.username,
      text,
      createdAt: new Date(),
    });

    // Save the post with the new comment
    await post.save();

    // Send a success response
    res.status(200).json({ msg: "Comment added successfully", post });
  } catch (err) {
    // Log the error and send a server error response
    console.error("Error adding comment:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get comments for a specific post
const getComments = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(200).json({
      msg: "Comments fetched successfully",
      comments: post.comments,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Add this to your controller file
const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Remove the comment by ID
    post.comments = post.comments.filter(comment => comment._id.toString() !== commentId);
    await post.save();

    res.status(200).json({ msg: "Comment deleted successfully", post });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const likePost = async (req, res) => {
  try {

    console.log('User likePost from req.user:', req.user); // Log user data

    const { id } = req.params;
    
    if (!req.user) {
      return res.status(401).json({ msg: 'User not authenticated' });
    }

 
    const { username } = req.user; // Safe to destructure now
    console.log('Username ho hai:', username);


    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.likes.includes(username)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.push(username);
    await post.save();

    res.status(200).json({ msg: 'Post liked successfully', likes: post.likes.length });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

const unlikePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({ msg: 'User not authenticated' });
    }

    console.log('User from req:', req.user); // Add this line for debugging


    const { username } = req.user; // Safe to destructure now

    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if the user has already liked the post
    if (!post.likes.includes(username)) {
      return res.status(400).json({ msg: 'Post not liked by user' });
    }

    // Remove user from post's likes
    post.likes = post.likes.filter(user => user !== username);
    await post.save();

    res.status(200).json({ msg: 'Post unliked successfully', likes: post.likes.length });
  } catch (error) {
    console.error('Error unliking post:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};


module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPost,
  addComment,
  getComments,
  deleteComment,
  likePost,
  unlikePost
};