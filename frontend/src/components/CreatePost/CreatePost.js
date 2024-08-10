import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../config/axiosConfig";


const CreatePost = () => {
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
  }, []);

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
    data.append("username", user.username); // Add user details
    // data.append("userId", user.id); // Add user ID if needed

    console.log(user.username);
    // console.log(user.id);

    console.log("Data:", data);
    console.log("FormData:", formData);
    
    try {
      const response = await axiosInstance.post("/api/posts", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.msg);
      console.log("Product added successfully:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <div className="ml-56 container mx-auto p-4">

      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 mt-14">Create Post</h1> <br />
      <h1 className="text-xl mb-4">Welcome, {user ? user.username : "Guest"}</h1> 

      <form onSubmit={handleSubmit}>
       
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 ">
          Product Image:
        </label>
        <input
          type="file"
          name="productImage"
          onChange={handleFileChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
        <div className="mb-4">
          <label className="block text-gray-700">Source</label>
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Skin Type</label>
          <input
            type="text"
            name="skintype"
            value={formData.skintype}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Time Span</label>
          <input
            type="text"
            name="productUsedTime"
            value={formData.productUsedTime}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
