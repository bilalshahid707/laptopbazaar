const express = require('express')
const Router = express.Router()
const supplierController =  require('../controllers/supplierController')

Router.route('/').get(supplierController.getAllSuppliers)
Router.route('/:slug').get(supplierController.getSupplier)
Router.route('/:slug/all-laptops').get(supplierController.getSupplierLaptops)

module.exports = Router