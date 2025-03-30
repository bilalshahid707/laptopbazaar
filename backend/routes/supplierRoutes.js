const express = require('express')
const Router = express.Router()
const supplierController =  require('../controllers/supplierController')
const authController = require('../controllers/authController')

Router.route('/').get(supplierController.getAllSuppliers).post(supplierController.createSupplier).patch(authController.protect,supplierController.updateSupplier)
Router.route('/:slug').get(supplierController.getSupplier)
Router.route('/:slug/all-laptops').get(supplierController.getSupplierLaptops)

module.exports = Router