const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  (req, res) => {

    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded"
      });
    }

    res.json({
      message: "Image Uploaded Successfully",
      image: req.file.filename,
      path: `/uploads/${req.file.filename}`
    });

  }
);

module.exports = router;