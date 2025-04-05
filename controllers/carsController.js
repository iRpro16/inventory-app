const db = require("../db/queries");

async function getCars(req, res) {
    const cars = await db.getAllCars();
    res.render("index", {
        cars: cars
    })
}

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

module.exports = {
    getCars,
    getAddCarForm,
    postAddCarForm
}