const userModel = require('../models/userModel')
const catchAsync = require('../utils/catchAysnc')

exports.getAllUsers = catchAsync(async(req,res)=>{
    const users = await userModel.user.find()
    res.status(200).json({
        status:'success',
        data:users
    })
})

exports.createUser = catchAsync(async(req,res)=>{
    const user = await userModel.user.create(req.body)
    res.status(200).json({
        status:'success',
        data:user
    })
})