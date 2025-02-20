const reviewModel = require('../models/reviewModel')
const catchAsync = require('../utils/catchAysnc')
const ApiError = require('../utils/AppError')


exports.getAllReviews = catchAsync(async(req,res)=>{
    const reviews = await reviewModel.find()
    res.status(200).json({
        status:'success',
        data:reviews
    })
})
exports.getLaptopReviews = catchAsync(async(req,res)=>{
    const reviews = await reviewModel.find({laptop:req.params.laptopId})
    res.status(200).json({
        status:'success',
        data:reviews
    })
})
exports.createReview = catchAsync(async(req,res)=>{
    const review = await reviewModel.create(req.body)
    res.status(201).json({
        status:'success',
        data:review
    })
})
