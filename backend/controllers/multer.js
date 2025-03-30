const multer = require("multer");
const sharp = require("sharp");
const path = require('path')

const storage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("only images are accepted", 400));
  }
};
exports.upload = multer({ storage: storage, fileFilter: multerFilter });