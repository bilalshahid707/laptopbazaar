const reviewModel = require("../models/reviewModel");
const catchAsync = require("../utils/catchAysnc");
const AppError = require("../utils/AppError");

exports.getAllReviews = catchAsync(async (req, res) => {
  const reviews = await reviewModel.find();
  res.status(200).json({
    status: "success",
    data: reviews,
  });
});
exports.getLaptopReviews = catchAsync(async (req, res) => {
  const reviews = await reviewModel.find({ laptop: req.params.laptopId });
  res.status(200).json({
    status: "success",
    data: reviews,
  });
});
exports.createReview = catchAsync(async (req, res,next) => {
  const userReviews = await reviewModel.find({ user: req.user._id });
  const {laptop} = req.body
  let reviewExists = false
  userReviews.forEach(review=>{
    if(String(laptop)===String(review.laptop._id)){
      reviewExists=true
    }
  })
  if(reviewExists){
    return next(new AppError("You can't post review twice on one laptop",409))
  }
  const review = await reviewModel.create({ ...req.body, user: req.user._id });
  res.status(201).json({
    status: "success",
    data: review,
  });
});
exports.deleteReview =  catchAsync(async(req,res)=>{
  const review = await reviewModel.deleteOne({id:req.params.id})
      res.status(200).json({
          status:"success",
          data:null
      })
})
