const express = require("express");
const Router = express.Router();
const laptopController = require("../controllers/laptopController");
const authController = require("../controllers/authController.js");

Router.route("/get-stats").get(laptopController.getStats);
Router.route("/top-brands").get(laptopController.topBrands);
Router.route("/")
  .get(laptopController.getAllLaptops)
  .post(
    authController.protect,
    authController.restrictTo("supplier", "admin"),
    laptopController.uploadImages,
    laptopController.resizeImages,
    laptopController.createLaptop
  );
Router.route("/:id")
  .get(laptopController.getLaptop)
  .patch(
    authController.protect,
    authController.restrictTo("supplier", "admin"),
    laptopController.uploadImages,
    laptopController.resizeImages,
    laptopController.updateLaptop
  )
  .delete(
    authController.protect,
    authController.restrictTo("supplier", "admin"),
    laptopController.deleteLaptop
  );

module.exports = Router;
