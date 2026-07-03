const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Only Super Admin

router.get(
  "/",
  authMiddleware,
  roleMiddleware("superadmin"),
  getUsers
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("superadmin"),
  getUser
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("superadmin"),
  updateUser
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("superadmin"),
  deleteUser
);

module.exports = router;