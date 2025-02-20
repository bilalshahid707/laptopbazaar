const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAysnc')
const AppError = require('../utils/AppError')
const userModel = require('../models/userModel')


const signToken = (id)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}

exports.signin = catchAsync(async(req,res,next)=>{
    const {email,password} = req.body
    if (!email || !password){
        return next(new AppError("Please provide email and password"),400)
    }
    const user = await userModel.user.findOne({email}).select('+password')

    if (user && await user.correctPassword(password,user.password)){
        token = signToken(user._id)
    }else{
        return next(new AppError('Invalid email or password'),404)
    }
    if (token){
        res.status(200).json({
            status:'success',
            data:token
        })
    }

})

exports.signup = catchAsync(async(req,res,next)=>{
    const user = await userModel.user.create(req.body)
    token = signToken(user._id)
    res.status(200).json({
        status:'success',
        data:token
    })
})

exports.protect = catchAsync(async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token=req.headers.authorization.split(' ')[1]
    }
    if (!token){
        return next(new AppError("You are not logged in!"),400)
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const currentUser = userModel.user.findById(decoded.id)
    next()
})