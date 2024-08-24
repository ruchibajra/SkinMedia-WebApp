import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const HomeCard = (props) => {
  const [activePostIndex, setActivePostIndex] = useState(null);
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState({});
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsername(user.username);
      fetchPosts(user.username);
    }
  }, []);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("/api/posts/");
      setPosts(response.data.posts);

      // const likedPostsResponse = response.data.posts.reduce((acc, post) => {
      //   if (post.likes.includes(username)) {
      //     acc.add(post._id);
      //   }
      //   return acc;
      // }, new Set());
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  const handleUpdate = (post) => {
    navigate("/createPost", { state: { post, mode: "update" } });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/api/posts/delete/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(response.data.msg);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error(error.response.data.msg);
    }
  };

  const handlePostComment = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const comment = commentText[postId] || "";
      await axios.post(
        `http://localhost:5000/api/posts/comments`,
        { postId, text: comment },
        { headers: { Authorization: token } }
      );
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
      fetchComments(postId);
    } catch (error) {
      console.error("Error posting comment: ", error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/${postId}/comments`
      );
      setComments((prev) => ({ ...prev, [postId]: response.data.comments }));
    } catch (error) {
      console.error("Error fetching comments: ", error);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/posts/${postId}/comments/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Comment deleted successfully");
      fetchComments(postId);
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    }
  };

  const toggleDropdown = (index) => {
    setDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleToggleComments = (postId) => {
    if (showComments[postId]) {
      setShowComments((prev) => ({ ...prev, [postId]: false }));
    } else {
      fetchComments(postId);
      setShowComments((prev) => ({ ...prev, [postId]: true }));
    }
  };

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token in Like Request:", token); // Log token here

      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/like`,
        {},
        {
          headers: { Authorization: `${token}` },
        }
      );

      // Update the post data in the state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: response.data.post.likes,
                likeCount: response.data.post.likeCount,
              }
            : post
        )
      );

      toast.success("Post liked successfully");
      console.log("Like response:", response); // Log response
      fetchPosts(); // Refresh posts to update like status
    } catch (error) {
      console.error(
        "Error liking post:",
        error.response?.data || error.message
      );
      toast.error("Failed to like post");
    }
  };

  const handleUnlike = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/posts/${postId}/unlike`,
        {},
        {
          headers: { Authorization: `${token}` },
        }
      );
  
      // Update the post data in the state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, likes: post.likes.filter((like) => like !== username), likeCount: post.likeCount - 1 }
            : post
        )
      );
  
      toast.success("Post unliked successfully");
    } catch (error) {
      console.error("Error unliking post:", error);
      toast.error("Failed to unlike post");
    }
  };

  return (
    <div className="mt-10 container ml-64 p-6 w-10/12">
      <h1>Welcome, {username}</h1>
      <div className="flex gap-10">
        <div className="flex-1">
          {posts.map((post, index) => (
            <div
              key={post._id}
              className="bg-white w-3/4  border border-gray-300 rounded-lg shadow-md mb-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center p-4 border-b border-gray-300">
                <div className="ml-4 w-full flex items-center justify-between">
                  <div>
                    <span className="block font-semibold">{post.username}</span>
                    <span className="text-gray-600 text-sm">
                      {post.timespan}
                    </span>
                  </div>
                  <div className="relative">
                    <i
                      className="three-dots ri-more-2-line text-xl cursor-pointer"
                      onClick={() => toggleDropdown(index)}
                    ></i>
                    {dropdownIndex === index && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-300 shadow-lg rounded-md">
                        <button
                          onClick={() => handleUpdate(post)}
                          className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h1 className="text-xl font-bold mb-2">{post.title}</h1>
                <p className="text-gray-700 mb-4">
                  Honest Review: {post.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <strong>Product Name:</strong> <br /> {post.productName}
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <strong>Source:</strong> <br /> {post.source}
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <strong>Skin Type:</strong> <br /> {post.skintype}
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <strong>Time Span:</strong> <br /> {post.productUsedTime}
                  </div>
                </div>
                <img
                  className="w-full h-96 object-cover rounded-lg mb-4"
                  src={post.productImage}
                  alt="Post"
                />
                <div className="flex flex-col text-gray-600">
                  <div className="flex justify-between">
                  <button
                    onClick={() =>
                      post.likes.includes(username)
                        ? handleUnlike(post._id)
                        : handleLike(post._id)
                    }
                    className="flex items-center gap-1 h-9 w-36 justify-center rounded-full bg-gray-200 px-4 py-2 text-gray-700 transition-all"
                  >
                    {post.likes.includes(username) ? "Unlike" : "Like"}
                  </button>

                    <button
                      onClick={() => handleToggleComments(post._id)}
                      className="flex items-center gap-1 h-9 w-36 justify-center rounded-full bg-gray-200 px-4 py-2 text-gray-700 transition-all"
                    >
                      <i className="comment-icon ri-chat-1-line"></i>
                      {showComments[post._id] ? "Hide Comments" : "Comments"}
                    </button>
                  </div>

                  {post.likes.includes(username) && (
                  <p className="mt-2 text-gray-500">You have liked this post.</p>
                )}

                <p className="mt-2 text-gray-600">
                  {post.likeCount} {post.likeCount === 1 ? "like" : "likes"}
                </p>

                  {showComments[post._id] && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <textarea
                          value={commentText[post._id] || ""}
                          onChange={(e) =>
                            setCommentText((prev) => ({
                              ...prev,
                              [post._id]: e.target.value,
                            }))
                          }
                          className="flex-1 rounded-md border-gray-300"
                          placeholder="Write a comment..."
                        />
                        <button
                          onClick={() => handlePostComment(post._id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                          Post
                        </button>
                      </div>
                      <ul className="space-y-2">
                        {comments[post._id]?.map((comment) => (
                          <li
                            key={comment._id}
                            className="flex justify-between items-start bg-gray-100 p-2 rounded-md"
                          >
                            <div>
                              <span className="font-semibold">
                                {comment.username}:
                              </span>{" "}
                              {comment.text}
                            </div>
                            {comment.username === username && (
                              <button
                                onClick={() =>
                                  handleDeleteComment(post._id, comment._id)
                                }
                                className="text-red-500 text-sm"
                              >
                                Delete
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
