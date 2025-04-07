const userModel = require("../models/userModel");
const laptopModel = require("../models/laptopModel");
const catchAsync = require("../utils/catchAysnc");

exports.getAllSuppliers = catchAsync(async (req, res) => {
  const suppliers = await userModel.supplier.find();
  res.status(200).json({
    status: "success",
    data: suppliers,
  });
});

exports.getSupplier = catchAsync(async (req, res) => {
  const supplier = await userModel.supplier.findOne({ slug: req.params.slug });
  res.status(200).json({
    status: "success",
    data: supplier,
  });
});

exports.getSupplierLaptops = catchAsync(async (req, res) => {
  const supplier = await userModel.user.findOne({ slug: req.params.slug });
  const laptops = await laptopModel
    .find({ supplier: supplier._id })
    .sort({ listedAt: -1 });
  res.status(200).json({
    status: "success",
    data: laptops,
  });
});

exports.createSupplier = catchAsync(async (req, res, next) => {
  let newSupplier;
  const supplierData = { ...req.body, role: "supplier" };

  // If supplier has signed up as user before then updating to supplier
  const supplier = await userModel.user.findOne({ email: req.body.email });
  if (supplier) {
    Object.assign(supplier, supplierData);
    await supplier.save();
    newSupplier = supplier;
  } else {
    newSupplier = await userModel.user.create(supplierData);
  }

  res.status(200).json({
    status: "success",
    data: newSupplier,
  });
});

exports.updateSupplier = catchAsync(async (req, res) => {
  const updatedSupplier = await userModel.user.findByIdAndUpdate(
    req.user._id,
    req.body,
    { overwriteDiscriminatorKey: true, new: true }
  );

  res.status(201).json({
    status: "success",
    data: updatedSupplier,
  });
});

exports.deleteSupplier = catchAsync(async (req, res) => {
  const user = await userModel.supplier.deleteOne({ id: req.params.id });
  res.status(200).json({
    status: "success",
    data: null,
  });
});
