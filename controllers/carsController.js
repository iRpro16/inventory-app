const db = require("../db/queries");

async function getAddCarForm(req, res) {
    const origins = await db.getAllOrigins();
    const manufacturers = await db.getAllManufacturers();
    res.render("addCarForm", {
        title: "Add car",
        origins: origins,
        manufacturers: manufacturers
    })
}

async function postAddCarForm(req, res) {
    const origins = await db.getAllOrigins();
    const manufacturers = await db.getAllManufacturers();
    const origin_id = origins.find(e => e.origin === req.body.origins).id;
    const manufacturer_id = manufacturers.find(e => e.manufacturer === req.body.manufacturers).id;
    
    db.insertCar(
        req.body.make,
        req.body.model,
        req.body.year,
        origin_id,
        manufacturer_id
    )
    res.redirect("/");
}

async function getAddCategoryForm(req, res) {
    res.render("addCategoryForm", {
        title: "Add category"
    })
}

async function postAddCategoryForm(req, res) {
    db.insertManufacturer(req.body.manufacturer);
    res.redirect("/");
}

async function getDisplayCar(req, res) {
    const { id } = req.params;
    const cars = await db.getAllCars();
    const carObj = cars.find(e => e.id == id);
    res.render("viewCar", {
        car: carObj
    })
}

async function getCategories(req, res) {
    const manufacturers = await db.getAllManufacturers();
    res.render("index", {
        manufacturers: manufacturers
    })
}

async function getDisplayCarsFromCategory(req, res) {
    const { id } = req.params;
    const cars = await db.getAllCarsFromCategory(id);
    res.render("viewCars", {
        cars: cars
    })
}

async function getDisplayCarDetails(req, res) {
    const { id } = req.params;
    const car = await db.viewCarDetails(id);
    res.render('viewCar', {
        car: car[0]
    })
}

async function getEditForm(req, res) {
    const { id } = req.params;
    const car = await db.viewCarDetails(id);
    const origins = await db.getAllOrigins();
    const manufacturers = await db.getAllManufacturers();
    res.render("editCarForm", {
        title: "Edit car",
        car: car[0],
        origins: origins,
        manufacturers: manufacturers
    })
}

async function postEditForm(req, res) {
    const { id } = req.params;
    const origins = await db.getAllOrigins();
    const manufacturers = await db.getAllManufacturers();
    const origin_id = origins.find(e => e.origin === req.body.origins).id;
    const manufacturer_id = manufacturers.find(e => e.manufacturer === req.body.manufacturers).id; 
    await db.updateCarDetails(
        id,
        req.body.make,
        req.body.model,
        req.body.year,
        origin_id,
        manufacturer_id
    )
    res.redirect(`/view/${manufacturer_id}`);
}


module.exports = {
    getAddCarForm,
    postAddCarForm,
    getDisplayCar,
    getCategories,
    getDisplayCarsFromCategory,
    getAddCategoryForm,
    postAddCategoryForm,
    getDisplayCarDetails,
    getEditForm,
    postEditForm
}