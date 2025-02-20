const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({

})

const supplierModel = mongoose.model('suppliers',supplierSchema)
module.exports = supplierModel