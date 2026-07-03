const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
    );
  },
});

// File Filter
const fileFilter = (req, file, cb) => {

  const allowedTypes = /jpeg|jpg|png|gif|webp/;

  const isValid =
    allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
    allowedTypes.test(file.mimetype);

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."));
  }

};

module.exports = multer({
  storage,
  fileFilter,
});