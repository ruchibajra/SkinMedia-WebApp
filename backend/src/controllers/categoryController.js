const Category = require("../models/categoryModel");


// Helper function to send error responses
const sendErrorResponse = (res, error) => {
    console.log(error);
    res.status(500).json({ msg: error.message });
  };
  
  // Create a new category (Admin Only)
  const createCategory = async (req, res) => {
    const { name, description } = req.body;
  
    if (!name || !description) {
      return res.status(400).json({ msg: "All fields are required" });
    }
  
    //  check if category already exists
    try {
      const categoryExists = await Category.findOne({ name });
      if (categoryExists) {
        return res.status(400).json({ msg: "Category already exists" });
      }
      const category = new Category({
        name,
        description,
      });
      await category.save();
  
      return res.status(201).json({ 
        msg: "Category added successfully", 
        category: category,
        success: true,
       });
    } catch (error) {
      sendErrorResponse(res, error);
      // return res.status(500).json({ msg: error.message });
    }
  };


  // controller for updating a category
const updateCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    // Create an object to hold the fields to be updated
    const updateCategory = {};
    
    // Conditionally add fields to the updateCategory object
    if (name) updateCategory.name = name;
    if (description) updateCategory.description = description;

    // Check if there are fields to update
    if (Object.keys(updateCategory).length === 0) {
      return res.status(400).json({ msg: "No fields provided to update" });
    }

    const category = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      updateCategory,
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    return res
      .status(200)
      .json({ msg: "Category updated successfully", category });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


// controller for getting all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res
      .status(200)
      .json({ msg: "category fetched successfully", categories });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// controller for getting a single category

const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    return res
      .status(200)
      .json({ msg: "Category fetched successfully", category });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// controller for deleting a category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    return res.status(200).json({ msg: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

  module.exports = {createCategory, updateCategory, getCategories, getCategory, deleteCategory};