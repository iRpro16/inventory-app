const { Router } = require("express");
const indexRouter  = Router();
const carsController = require("../controllers/carsController");

// Display all categories
indexRouter.get("/", carsController.getCategories);

// Get and Post methods for the addCarForm
indexRouter.get("/add-car", carsController.getAddCarForm);
indexRouter.post("/add-car", carsController.postAddCarForm);

// Get and Post methods for the addCategoryForm
indexRouter.get("/add-category", carsController.getAddCategoryForm);
indexRouter.post("/add-category", carsController.postAddCategoryForm);

// View all cars based on category id
indexRouter.get("/view/:id", carsController.getDisplayCarsFromCategory);

// View car details 
indexRouter.get("/view-car/:id", carsController.getDisplayCarDetails);

module.exports = indexRouter;