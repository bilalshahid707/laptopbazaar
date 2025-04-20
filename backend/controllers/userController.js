const userModel = require("../models/userModel");
const laptopModel = require("../models/laptopModel");
const catchAsync = require("../utils/catchAysnc");
const multerUpload = require("./multer");
const sharp = require('sharp')
const path = require('path')

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await userModel.user.find();
  res.status(200).json({
    status: "success",
    data: users,
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const users = await userModel.user.findById(req.params.id).populate();
  res.status(200).json({
    status: "success",
    data: users,
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const user = await userModel.user.create(req.body);
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.updateme = catchAsync(async (req, res) => {
  const updatedUser = await userModel.user.findByIdAndUpdate(
    req.user._id,
    req.body,
    { overwriteDiscriminatorKey: true, new: true }
  );
  res.status(201).json({
    status: "success",
    data: updatedUser,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const laptops = await laptopModel.deleteMany({supplier:req.params.id})
  const user = await userModel.user.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    data: null,
  });
});

exports.uploadImages = multerUpload.upload.single("image");
exports.resizeImages = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.body.image = "";
  const imageName = `${req.user._id}.jpeg`;
  req.body.image = imageName;
  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 100 })
    .toFile(path.join(__dirname, "../public/users", `${imageName}`));

  next();
});
