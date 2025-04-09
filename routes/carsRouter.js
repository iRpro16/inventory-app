const { Router } = require("express");
const carsRouter = Router();
const carsController = require("../controllers/carsController");

// Get and Post methods for the addCarForm
carsRouter.get("/add-car", carsController.getAddCar);
carsRouter.post("/add-car", carsController.postAddCar);

// View cars and its details
carsRouter.get("/view/:id", carsController.getDisplayCarsByCategory); 
carsRouter.get("/view-car/:id", carsController.getDisplayCarDetails);

// Edit car details
carsRouter.get("/edit-car/:id", carsController.getEditCar);
carsRouter.post("/edit-car/:id", carsController.postEditCar);

module.exports = carsRouter;