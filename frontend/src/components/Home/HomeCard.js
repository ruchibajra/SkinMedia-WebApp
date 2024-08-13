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
  const [likedPosts, setLikedPosts] = useState(new Set());

  const [commentText, setCommentText] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsername(user.username);
    }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("/api/posts/");
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  // Function to handle post update
  const handleUpdate = (post) => {
    navigate("/createPost", { state: { post, mode: "update" } });
  };

  // Function to handle post deletion
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
      const comment = commentText[postId] || ""; // Default to empty string if no comment
      console.log("Posting comment with data:", { postId, text: comment }); // Log request data
  
      await axios.post(
        `http://localhost:5000/api/posts/comments`,
        { postId, text: comment },
        { headers: { Authorization: token } }
      );
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
      fetchComments(postId); // Refresh comments
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

  const toggleDropdown = (index) => {
    setDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Function to handle comment section toggle

  const handleToggleLike = async (postId) => {
    try {
      const token = localStorage.getItem("token");

      let response;
      if (likedPosts.has(postId)) {
        // Unlike post if already liked
        response = await axios.patch(
          `http://localhost:5000/api/posts/unlike/${postId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikedPosts((prevLikedPosts) => {
          const updatedLikedPosts = new Set(prevLikedPosts);
          updatedLikedPosts.delete(postId);
          return updatedLikedPosts;
        });
      } else {
        // Like post if not liked
        response = await axios.patch(
          `http://localhost:5000/api/posts/like/${postId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikedPosts((prevLikedPosts) => {
          const updatedLikedPosts = new Set(prevLikedPosts);
          updatedLikedPosts.add(postId);
          return updatedLikedPosts;
        });
      }

      toast.success(response.data.msg);
      fetchPosts(); // Fetch posts again to get updated like counts
    } catch (error) {
      console.error("Error toggling like status:", error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="mt-10 container ml-64 p-6 w-10/12">
      <h1>Welcome, {username} </h1>

      {/* SECOND PART SECTION START */}
      <div className="flex gap-10">
        {/* POST SECTION START */}
        <div className="flex-1">
          {posts.map((post, index) => (
            <div
              key={post._id}
              className="bg-white w-3/4  border border-gray-300 rounded-lg shadow-md mb-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center p-4 border-b border-gray-300">
                <div className="h-10 w-10 rounded-full bg-gray-400"></div>
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
                      onClick={() => handleToggleLike(post._id)}
                      className={`flex items-center gap-1 h-9 w-36 justify-center rounded-full px-4 py-1 text-sm ${
                        likedPosts.has(post._id)
                          ? "bg-red-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      <i
                        className={`ri-thumb-up-line ${
                          likedPosts.has(post._id) ? "text-white" : ""
                        }`}
                      ></i>
                      {post.likes}
                    </button>

                    <button onClick={() => fetchComments(post._id)}>
                      Show Comments
                    </button>
                    {comments[post._id] && (
                      <div>
                        {comments[post._id].map((comment, idx) => (
                          <div key={idx}>
                            <strong>{comment.username}</strong>: {comment.text}
                          </div>
                        ))}
                      </div>
                    )}
                    <input
                      type="text"
                      value={commentText[post._id] || ""}
                      onChange={(e) =>
                        setCommentText((prev) => ({
                          ...prev,
                          [post._id]: e.target.value,
                        }))
                      }
                      placeholder="Add a comment"
                    />
                    <button onClick={() => handlePostComment(post._id)}>
                      Post Comment
                    </button>

                    <button className="flex items-center gap-1 h-9 w-36 justify-center bg-gray-200 rounded-full px-4 py-1 text-sm">
                      <i className="ri-share-forward-line"></i>
                      {post.shares}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* POST SECTION END */}
      </div>
    </div>
  );
};

export default HomeCard;
