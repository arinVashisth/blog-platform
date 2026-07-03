const Tag = require("../models/Tag");

// Get All Tags
const getTags = async (req, res) => {
  try {

    const tags = await Tag.find().sort({ name: 1 });

    res.json(tags);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Create Tag
const createTag = async (req, res) => {
  try {

    const { name } = req.body;

    const existingTag = await Tag.findOne({
        name: req.body.name.trim()
    });

    if (existingTag) {
      return res.status(400).json({
        message: "Tag already exists.",
      });
    }

    const tag = await Tag.create({
      name,
    });

    res.status(201).json({
      message: "Tag Created Successfully",
      tag,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Update Tag
const updateTag = async (req,res)=>{

    try{

        const tag=await Tag.findById(req.params.id);

        if(!tag){

            return res.status(404).json({
                message:"Tag not found."
            });

        }

        const oldName=tag.name;
        const newName=req.body.name.trim();

        tag.name=newName;

        await tag.save();

        await Blog.updateMany(
            {
                tags:oldName
            },
            {
                $set:{
                    "tags.$":newName
                }
            }
        );

        res.json({
            message:"Tag updated."
        });

    }catch(err){

        res.status(500).json({
            message:err.message
        });

    }

}

// Delete Tag
const deleteTag = async (req, res) => {
  try {

    const tag = await Tag.findByIdAndDelete(req.params.id);

    if (!tag) {
      return res.status(404).json({
        message: "Tag not found",
      });
    }

    res.json({
      message: "Tag Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getTags,
  createTag,
  updateTag,
  deleteTag,
};