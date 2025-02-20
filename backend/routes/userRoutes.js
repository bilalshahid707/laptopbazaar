const express = require('express')
const Router = express.Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

Router.route('/signin').post(authController.signin)
Router.route('/signup').post(authController.signup)
Router.route('/').get(userController.getAllUsers).post(userController.createUser)

module.exports=Router