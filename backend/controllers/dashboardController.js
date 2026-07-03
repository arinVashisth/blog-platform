const Blog = require("../models/Blog");
const User = require("../models/User");

const getDashboardStats = async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const totalUsers = await User.countDocuments();

    const latestBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("author", "name");

    res.json({
      totalBlogs,
      totalUsers,
      latestBlogs,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};