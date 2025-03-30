const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAysnc");
const AppError = require("../utils/AppError");
const userModel = require("../models/userModel");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: "success",
    token: token,
    user: user
  });
};

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  const user = await userModel.user.findOne({ email }).select("+password");

  if (user && (await user.correctPassword(password, user.password))) {
    createSendToken(user, 200, res, req);
  } else {
    return next(new AppError("Invalid email or password", 404));
  }
});

exports.signup = catchAsync(async (req, res, next) => {
  const user = await userModel.user.create(req.body);
  createSendToken(user, 201, res, req);
});

exports.setUserData = catchAsync(async(req,res,next)=>{
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError("You are not logged in!", 400));
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  let currentUser = null;
  if (decoded) {
    currentUser = await userModel.user.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError("User does not exist", 404));
    }
  } else {
    return next(new AppError("Token Invalid", 400));
  }
  if (currentUser && currentUser.changedPassword(decoded.iat)) {
    return next(new AppError("Password Changed", 400));
  }
  res.status(200).json({
    status:'success',
    data:currentUser
  })
})

exports.protect = catchAsync(async (req, res, next) => {
  console.log(req.cookies)
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError("You are not logged in!", 400));
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  let currentUser = null;
  if (decoded) {
    currentUser = await userModel.user.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError("User does not exist", 404));
    }
  } else {
    return next(new AppError("Token Invalid", 400));
  }
  if (currentUser && currentUser.changedPassword(decoded.iat)) {
    return next(new AppError("Password Changed", 400));
  }

  req.user = currentUser;
  next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await userModel.user.findById(req.user._id).select("+password");
  if (!(await user.correctPassword(req.body.oldPassword, user.password))) {
    return next(new AppError("Current password is wrong", 400));
  }
  user.password = req.body.newPassword;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordChangedAt = Date.now();
  await user.save();
  createSendToken(user, 201, res);
});

exports.restrictTo = (...roles)=>{
  return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
      return next(new AppError("Access forbidded",403))
    }
    next()
  }
}