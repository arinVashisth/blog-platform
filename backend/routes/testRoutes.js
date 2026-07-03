const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("superadmin", "editor"),
  (req, res) => {
    res.json({
      message: "Welcome to Admin Dashboard",
      user: req.user,
    });
  }
);

module.exports = router;