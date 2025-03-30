const userModel = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAysnc");
const multerUpload = require("./multer");

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
  const user = await userModel.user.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    data: null,
  });
});

exports.uploadImages = multerUpload.upload.array("images", 5);
exports.resizeImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  req.body.images = [];
  for (let i = 0; i < req.files.length; i++) {
    const imageName = `${crypto.randomBytes(24).toString("hex")}-${i + 1}.jpeg`;
    req.body.images.push(imageName);
    await sharp(req.files[i].buffer)
      .toResize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 100 })
      .toFile(path.join(__dirname, "../public/laptops", `${imageName}`));
  }
  next();
});
