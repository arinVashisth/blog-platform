const User = require("../models/User");
const Blog = require("../models/Blog");

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      count: users.length,
      users,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single User
const getUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User Updated Successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {

    try {

        // Prevent self deletion

        if (req.user.id === req.params.id) {

            return res.status(400).json({
                message: "You cannot delete your own account."
            });

        }

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found."
            });

        }

        // Check if user owns any blogs

        const blogCount = await Blog.countDocuments({
            author: req.params.id
        });

        if (blogCount > 0) {

            return res.status(400).json({
                message: `Cannot delete user. This user owns ${blogCount} blog(s).`
            });

        }

        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: "User deleted successfully."
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};