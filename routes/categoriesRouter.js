const { Router } = require("express");
const categoriesRouter = Router();
const categoriesController = require("../controllers/categoriesController");

// Display all categories
categoriesRouter.get("/", categoriesController.getCategories);

// Get and Post methods for the addCategoryForm
categoriesRouter.get("/add-category", categoriesController.getAddCategory);
categoriesRouter.post("/add-category", categoriesController.postAddCategory);

module.exports = categoriesRouter;