const db = require("../db/queries");


// Add car - GET method
async function getAddCar(req, res) {
    const origins = await db.getAllOrigins();
    const manufacturers = await db.getAllManufacturers();
    res.render("cars/add", {
        title: "Add car",
        origins: origins,
        manufacturers: manufacturers
    })
}

// Add car - POST method
async function postAddCar(req, res) {
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

// Display car - GET method
async function getDisplayCar(req, res) {
    const { id } = req.params;
    const cars = await db.getAllCars();
    const carObj = cars.find(e => e.id == id);
    res.render("cars/details", {
        car: carObj
    })
}

// Display cars by category - GET method
async function getDisplayCarsByCategory(req, res) {
    const { id } = req.params;
    const cars = await db.getAllCarsFromCategory(id);
    res.render("cars/view", {
        cars: cars
    })
}

// Display car details - GET method
async function getDisplayCarDetails(req, res) {
    const { id } = req.params;
    const car = await db.viewCarDetails(id);
    res.render('cars/details', {
        car: car[0]
    })
}

// Edit car - GET method
async function getEditCar(req, res) {
    const { id } = req.params;
    const car = await db.viewCarDetails(id);
    const origins = await db.getAllOrigins();
    const manufacturers = await db.getAllManufacturers();
    res.render("cars/edit", {
        title: "Edit car",
        car: car[0],
        origins: origins,
        manufacturers: manufacturers
    })
}

// Edit car - POST method
async function postEditCar(req, res) {
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
    res.redirect(`/cars/view/${manufacturer_id}`); // check
}


module.exports = {
    getAddCar,
    postAddCar,
    getDisplayCar,
    getDisplayCarsByCategory,
    getDisplayCarDetails,
    getEditCar,
    postEditCar
}