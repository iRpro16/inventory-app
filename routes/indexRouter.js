const { Router } = require("express");
const indexRouter  = Router();
const carsController = require("../controllers/carsController");

indexRouter.get("/", carsController.getCars);
indexRouter.get("/add", carsController.getAddCarForm);
indexRouter.post("/add", carsController.postAddCarForm);

module.exports = indexRouter;