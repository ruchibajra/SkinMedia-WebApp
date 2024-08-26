import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const HomeCard = () => {
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState({});
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const [likedUsers, setLikedUsers] = useState({});
  const [showLikedUsers, setShowLikedUsers] = useState({});

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
            ? {
                ...post,
                likes: post.likes.filter((like) => like !== username),
                likeCount: post.likeCount - 1,
              }
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
    <div className="container mx-auto p-6">
      <div className="space-y-6 ">
        {posts.map((post, index) => (
          <div
            key={post._id}
            className="bg-white border w-3/5 mx-auto border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform "
          >
            <div className="flex items-center p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex-1">
                <span className="font-semibold text-lg">{post.username}</span>
                <span className="text-gray-500 text-sm ml-2">{post.timespan}</span>
              </div>
              <div className="relative">
                <i
                  className="ri-more-2-line text-xl cursor-pointer text-gray-600"
                  onClick={() => toggleDropdown(index)}
                ></i>
                {dropdownIndex === index && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md z-10">
                    <button
                      onClick={() => handleUpdate(post)}
                      className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <strong>Product Name:</strong> <br /> {post.productName}
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <strong>Source:</strong> <br /> {post.source}
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <strong>Skin Type:</strong> <br /> {post.skinType}
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <strong>Time Span:</strong> <br /> {post.productUsedTime}
                </div>
              </div>
              <img
                src={post.productImage}
                alt="Product"
                className="w-full h-80 object-cover rounded-lg mb-4"
              />
              <div className="flex items-center justify-between text-gray-600 mb-4">
                <p className="text-sm">
                  {post.likeCount} {post.likeCount === 1 ? "like" : "likes"}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      post.likes.includes(username)
                        ? handleUnlike(post._id)
                        : handleLike(post._id)
                    }
                    className={`px-4 py-2 rounded-lg text-white transition-all ${
                      post.likes.includes(username)
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {post.likes.includes(username) ? "Unlike" : "Like"}
                  </button>
                  <button
                    onClick={() => handleToggleComments(post._id)}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    <i className="ri-chat-1-line text-lg"></i>{" "}
                    {showComments[post._id] ? "Hide Comments" : "Comments"}
                  </button>
                </div>
              </div>
              {showComments[post._id] && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex mb-4">
                    <textarea
                      value={commentText[post._id] || ""}
                      onChange={(e) =>
                        setCommentText((prev) => ({
                          ...prev,
                          [post._id]: e.target.value,
                        }))
                      }
                      className="flex-1 rounded-md border border-gray-300 p-2"
                      placeholder="Write a comment..."
                    />
                    <button
                      onClick={() => handlePostComment(post._id)}
                      className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Post
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {comments[post._id]?.map((comment) => (
                      <li
                        key={comment._id}
                        className="flex justify-between items-start bg-white p-2 rounded-md shadow-sm"
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
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
