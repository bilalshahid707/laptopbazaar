const express = require("express");
const Router = express.Router();
const laptopController = require("../controllers/laptopController");

Router.route("/get-stats").get(laptopController.getStats)
Router.route("/")
  .get(laptopController.getAllLaptops)
  .post(laptopController.createLaptop);
Router.route("/:id")
  .get(laptopController.getLaptop)
  .patch(laptopController.updateLaptop)
  .delete(laptopController.deleteLaptop);

module.exports = Router;
