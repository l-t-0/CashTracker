const CategoryModel = require("../models/CategoryModel");

const addCategory = async (req, res) => {
  const { name, type } = req.body;

  console.log('Request to add category received:', req.body);

  try {
    const existingCategory = await CategoryModel.findOne({ name });

    if (existingCategory) {
      console.log('Category already exists:', existingCategory);
      return res.status(400).json({ error: "Category already exists" });
    }

    const newCategory = new CategoryModel({
      name,
      type,
    });

    const savedCategory = await newCategory.save();

    console.log('Category saved successfully:', savedCategory);

    res.status(200).json(savedCategory);
  } catch (error) {
    console.log('Error while saving category:', error);
    res.status(500).json({ error: "Error" });
  }
};

const getCategories = async (req, res) => {
    try {
      const categories = await CategoryModel.find({});
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: "Error fetching categories" });
    }
  };

  const deleteCategory = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedCategory = await CategoryModel.findByIdAndRemove(id);
  
      if (!deletedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }
  
      res.status(200).json(deletedCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });    }
  };

module.exports = { addCategory, getCategories, deleteCategory };