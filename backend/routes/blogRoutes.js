const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createBlog,
  getBlogs,
  getBlogBySlug,
  getPublishedBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// Create Blog
router.post(
  "/",
  authMiddleware,
  roleMiddleware("superadmin", "editor", "author"),
  createBlog
);

// Get All Blogs
router.get(
    "/",
    authMiddleware,
    roleMiddleware("superadmin", "editor", "author"),
    getBlogs
);

router.get(
    "/public",
    getPublishedBlogs
);

// Get Blog By Slug
router.get("/:slug", getBlogBySlug);

// Update Blog
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("superadmin", "editor", "author"),
  updateBlog
);

// Delete Blog
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("superadmin", "editor", "author"),
    deleteBlog
);

module.exports = router;