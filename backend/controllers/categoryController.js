const Category = require("../models/Category");
const Blog = require("../models/Blog");

const getCategories = async (req, res) => {

    const categories = await Category.find().sort({
        name:1
    });

    res.json(categories);

};

const createCategory = async(req,res)=>{

    const existingCategory = await Category.findOne({
        name: req.body.name.trim()
    });

    if (existingCategory) {
        return res.status(400).json({
            message: "Category already exists."
        });
    }

    const category = await Category.create({
        name:req.body.name
    });

    res.status(201).json(category);

};
// Update Category
const updateCategory = async (req, res) => {

    try {

        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found."
            });
        }

        const oldName = category.name;
        const newName = req.body.name.trim();

        category.name = newName;

        await category.save();

        await Blog.updateMany(
            {
                categories: oldName
            },
            {
                $set: {
                    "categories.$": newName
                }
            }
        );

        res.json({
            message: "Category updated successfully."
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Delete Category
const deleteCategory = async (req, res) => {

    try {

        const category = await Category.findById(req.params.id);

        if (!category) {

            return res.status(404).json({
                message: "Category not found",
            });

        }

        // Check whether any blog is using this category

        const blogsUsingCategory = await Blog.find({
            categories: category.name,
        });

        if (blogsUsingCategory.length > 0) {

            return res.status(400).json({
                message: `Cannot delete "${category.name}". It is being used by ${blogsUsingCategory.length} blog(s).`,
            });

        }

        await Category.findByIdAndDelete(req.params.id);

        res.json({
            message: "Category deleted successfully.",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};


module.exports={
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};