const express = require("express");
const Router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

Router.route("/signin").post(authController.signin);
Router.route("/signup").post(authController.signup);
Router.route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
Router.route("/updateme").patch(
  authController.protect,
  userController.uploadImages,
  userController.resizeImages,
  userController.updateme
);
Router.route("/updatepassword").patch(
  authController.protect,
  authController.updatePassword
);
Router.route("/setuserdata").get(authController.setUserData);

Router.use(authController.protect, authController.restrictTo("admin"));
Router.route("/:id")
  .delete(userController.deleteUser)

module.exports = Router;
