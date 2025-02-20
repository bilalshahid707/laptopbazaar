const userModel = require('../models/userModel')
const laptopModel = require('../models/laptopModel')
const catchAsync = require('../utils/catchAysnc')

exports.getAllSuppliers = catchAsync(async(req,res)=>{
    const suppliers = await userModel.supplier.find()
    res.status(200).json({
        status:'success',
        data:suppliers
    })
})

exports.getSupplier = catchAsync(async(req,res)=>{
    const supplier = await userModel.supplier.findOne({slug:req.params.slug})
    res.status(200).json({
        status:'success',
        data:supplier
    })
})

exports.getSupplierLaptops = catchAsync(async(req,res)=>{
    const supplier = await userModel.supplier.findOne({slug:req.params.slug})
    const laptops = await laptopModel.find({supplier:supplier._id})
    res.status(200).json({
        status:'success',
        data:laptops
    })
})