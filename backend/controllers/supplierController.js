const userModel = require('../models/userModel')
const laptopModel = require('../models/laptopModel')
const catchAsync = require('../utils/catchAysnc')
const AppError = require('../utils/AppError')

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
    const supplier = await userModel.user.findOne({slug:req.params.slug})
    const laptops = await laptopModel.find({supplier:supplier._id}).sort({listedAt:-1})
    res.status(200).json({
        status:'success',
        data:laptops
    })
})

exports.createSupplier = catchAsync(async(req,res,next)=>{
    const supplierData={...req.body,role:'supplier'}
    const supplier = await userModel.user.findOne({email:req.body.email})
    if (req.headers.userid && req.headers.userid !== supplier.id){
        return next(new AppError("Your personal email is in use by another user"))
    }
    const updatedSupplier = await userModel.user.findOneAndUpdate({email:req.body.email},supplierData,{overwriteDiscriminatorKey:true,new:true})
    if (updatedSupplier){
        updatedSupplier.password = req.body.password;
        updatedSupplier.confirmPassword = req.body.confirmPassword;
        await updatedSupplier.save()
    }
    if(!updatedSupplier){
        updatedSupplier = await userModel.updatedSupplier.create(supplierData)
    }
    res.status(201).json({
        status:'success',
        data:supplier
    })
})

exports.updateSupplier = catchAsync(async(req,res)=>{
    const updatedSupplier = await userModel.supplier.findByIdAndUpdate(req.user._id,req.body)
    res.status(201).json({
        status:"success",
        data:updatedSupplier
    })
})

exports.deleteSupplier = catchAsync(async(req,res)=>{
    const user = await userModel.supplier.deleteOne({id:req.params.id})
    res.status(200).json({
        status:"success",
        data:null
    })
})