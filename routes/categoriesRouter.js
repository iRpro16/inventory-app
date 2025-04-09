const { Router } = require("express");
const categoriesRouter = Router();
const categoriesController = require("../controllers/categoriesController");

// Display all categories
categoriesRouter.get("/", categoriesController.getCategories);

// Get and Post methods for the addCategoryForm
categoriesRouter.get("/add-category", categoriesController.getAddCategory);
categoriesRouter.post("/add-category", categoriesController.postAddCategory);

// Delete category and all its cars
categoriesRouter.get("/delete/:id", categoriesController.getDeleteCategory);

module.exports = categoriesRouter;