import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../config/axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar"; // Ensure Navbar path is correct

const CreatePost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { post, mode } = location.state || {};

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    productName: "",
    productImage: "",
    source: "",
    skintype: "",
    productUsedTime: "",
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user information from localStorage or context
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      setUser(userInfo);
    }

    if (location.state && location.state.post) {
      setFormData({
        title: location.state.post.title,
        description: location.state.post.description,
        productName: location.state.post.productName,
        productImage: location.state.post.productImage,
        source: location.state.post.source,
        skintype: location.state.post.skintype,
        productUsedTime: location.state.post.productUsedTime,
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      productImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("productName", formData.productName);
    data.append("productImage", formData.productImage);
    data.append("source", formData.source);
    data.append("skintype", formData.skintype);
    data.append("productUsedTime", formData.productUsedTime);
    data.append("username", user.username);

    try {
      let response;

      if (mode === 'update') {
        // Update existing post
        response = await axiosInstance.patch(`/api/posts/update/${post._id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Post updated successfully!");
      } else {
        // Create new post
        response = await axiosInstance.post("/api/posts", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Post created successfully!");
      }

      navigate("/home"); // Navigate to the home page or wherever appropriate
    } catch (error) {
      toast.error(error.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="p-4 w-3/6 mx-auto bg-white rounded-lg shadow-md mt-10">
        <ToastContainer />
        <h1 className="text-2xl font-semibold mb-4 text-center">
          {mode === "update" ? "Update Post" : "Create Post"}
        </h1>
        <h2 className="text-lg mb-4 text-center">
          Welcome, {user ? user.username : "Guest"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium text-sm">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border rounded w-full py-1 px-2 text-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium text-sm">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border rounded w-full py-1 px-2 text-sm focus:ring-2 focus:ring-blue-500"
              required
              rows="3"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium text-sm">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="border rounded w-full py-1 px-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium text-sm">Product Image</label>
            <input
              type="file"
              name="productImage"
              onChange={handleFileChange}
              className="border rounded w-full py-1 px-2 text-sm"
            />
            {formData.productImage && typeof formData.productImage === "object" ? (
              <img
                src={URL.createObjectURL(formData.productImage)}
                alt="Product Preview"
                className="mt-2 w-24 h-24 object-cover rounded"
              />
            ) : (
              formData.productImage && (
                <img
                  src={formData.productImage}
                  alt="Product"
                  className="mt-2 w-24 h-24 object-cover rounded"
                />
              )
            )}
          </div>
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium text-sm">Source</label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="border rounded w-full py-1 px-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium text-sm">Skin Type</label>
            <input
              type="text"
              name="skintype"
              value={formData.skintype}
              onChange={handleChange}
              className="border rounded w-full py-1 px-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium text-sm">Time Span</label>
            <input
              type="text"
              name="productUsedTime"
              value={formData.productUsedTime}
              onChange={handleChange}
              className="border rounded w-full py-1 px-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition text-sm"
          >
            {mode === 'update' ? 'Save Changes' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
