const { Router } = require("express");
const indexRouter  = Router();
const carsRouter = require("./carsRouter");
const categoriesRouter = require("./categoriesRouter");

// Display all categories
indexRouter.use("/", categoriesRouter);
indexRouter.use("/cars", carsRouter);

module.exports = indexRouter;