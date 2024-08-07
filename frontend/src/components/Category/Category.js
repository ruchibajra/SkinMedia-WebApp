import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosConfig";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryIntegration = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/api/category/all");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      if (editingCategory) {
        const response = await axiosInstance.patch(
          `/api/category/update/${editingCategory._id}`,
          newCategory
        );
        toast.success(response.data.msg);
        setEditingCategory(null);
      } else {
        const response = await axiosInstance.post(
          "/api/category/create",
          newCategory
        );
        toast.success(response.data.msg);
      }
      setNewCategory({ name: "", description: "" });
      fetchCategories();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleEdit = (category) => {
    setNewCategory({ name: category.name, description: category.description });
    setEditingCategory(category);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/category/delete/${id}`);
      toast.success(response.data.msg);
      fetchCategories();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="container mx-auto mt-16 p-6 max-w-4xl">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Skincare Topic Categories</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="text-lg font-medium mb-2">Topic Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={newCategory.name}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="description" className="text-lg font-medium mb-2">Topic Description</label>
          <textarea
            name="description"
            id="description"
            value={newCategory.description}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          {editingCategory ? "Update Category" : "Add Category"}
        </button>
      </form>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4"> #Topic List</h2>
        <ul className="divide-y divide-gray-300">
          {categories.map((category) => (
            <li
              key={category._id}
              className="flex justify-between items-center py-4"
            >
              <div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="text-blue-600 hover:text-blue-800 transition"
                  title="Edit Category"
                >
                  <AiFillEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="text-red-600 hover:text-red-800 transition"
                  title="Delete Category"
                >
                  <AiFillDelete size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryIntegration;
