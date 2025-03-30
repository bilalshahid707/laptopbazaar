const laptopModel = require("../models/laptopModel");
const catchAsync = require("../utils/catchAysnc");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/ApiFeatures");
const multerUpload = require("./multer");
const sharp = require("sharp");
const path = require('path')
const crypto = require("crypto")


exports.getAllLaptops = catchAsync(async (req, res) => {
  const query = await laptopModel.find();
  const API = new ApiFeatures(query, req.query, laptopModel)
    .filter()
    .pagination();
  const laptops = await API.query;
  res.status(200).json({
    status: "success",
    data: laptops,
  });
});

exports.uploadImages = multerUpload.upload.array('images',5);
exports.resizeImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  req.body.images = [];
  for (let i = 0; i < req.files.length; i++) {
    const imageName = `${crypto.randomBytes(24).toString('hex')}-${i+1}.jpeg`;
    req.body.images.push(imageName);
    await sharp(req.files[i].buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 100 })
      .toFile(path.join(__dirname, "../public/laptops", `${imageName}`));
  }
  next()
});
exports.createLaptop = catchAsync(async (req, res) => {
  const laptopData = { ...req.body, supplier: req.user._id };
  const laptop = await laptopModel.create(laptopData);
  res.status(200).json({
    status: "success",
    data: laptop,
  });
});

exports.getLaptop = catchAsync(async (req, res) => {
  const laptop = await laptopModel.findOne({ _id: req.params.id }).populate({path:'reviews'});
  res.status(200).json({
    status: "success",
    data: laptop,
  });
});

exports.updateLaptop = catchAsync(async (req, res) => {
  const laptopData = { ...req.body, supplier: req.user._id };
  const laptop = await laptopModel.findByIdAndUpdate(
    req.params.id,
    laptopData,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: laptop,
  });
});

exports.deleteLaptop = catchAsync(async (req, res) => {
  const laptop = await laptopModel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.getStats = catchAsync(async (req, res, next) => {
  const stats = await laptopModel.aggregate([
    {
      $count: "totalLaptops",
    },
  ]);
  res.status(200).json({
    status: "success",
    data: stats,
  });
});
