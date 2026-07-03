const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getTags,
  createTag,
  updateTag,
  deleteTag,
} = require("../controllers/tagController");

// Get All Tags
router.get("/", getTags);

// Create Tag
router.post(
  "/",
  authMiddleware,
  roleMiddleware("superadmin", "editor"),
  createTag
);

// Update Tag
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("superadmin", "editor"),
  updateTag
);

// Delete Tag
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("superadmin"),
  deleteTag
);

module.exports = router;