const laptopModel = require("../models/laptopModel");
const catchAsync = require("../utils/catchAysnc");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/ApiFeatures");

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

exports.createLaptop = catchAsync(async (req, res) => {
  const laptop = await laptopModel.create(req.body);
  res.status(200).json({
    status: "success",
    data: laptop,
  });
});

exports.getLaptop = catchAsync(async(req,res)=>{
    const laptop = await laptopModel.findOne({_id:req.params.id})
    res.status(200).json({
        status: "success",
        data: laptop,
      });
})

exports.updateLaptop = catchAsync(async(req,res)=>{
    const laptop = await laptopModel.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        status: "success",
        data: laptop,
      });
})

exports.deleteLaptop = catchAsync(async(req,res)=>{
    const laptop = await laptopModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status:'success',
        data:null
    })
})

exports.getStats = catchAsync(async(req,res,next)=>{
  const stats = await laptopModel.aggregate([
    {
      $count:'totalLaptops',
    },
  ])
  res.status(200).json({
    status:'success',
    data:stats
  })
})
