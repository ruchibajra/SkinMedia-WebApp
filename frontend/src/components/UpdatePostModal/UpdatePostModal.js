import React, { useState } from 'react';
import axiosInstance from "../../config/axiosConfig";
import { toast } from "react-toastify";

const UpdatePostModal = ({ post, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: post.title,
    description: post.description,
    productName: post.productName,
    productImage: post.productImage, // Handle image differently if needed
    source: post.source,
    skintype: post.skintype,
    productUsedTime: post.productUsedTime,
  });

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

    try {
      const response = await axiosInstance.patch(`/api/posts/${post._id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post updated successfully");
      onUpdate(response.data.post); // Update post in the parent component
    } catch (error) {
      toast.error("Error updating post");
    }
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Update Post</h2>
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
            <label className="block text-gray-700">Product Image</label>
            <input
              type="file"
              name="productImage"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formData.productImage && (
              <img
                src={URL.createObjectURL(formData.productImage)}
                alt="Preview"
                className="mt-4 max-w-full h-auto"
              />
            )}
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
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Update Post
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePostModal;
