const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const { returnValues }  = require("../utils/returnValues.js");

// Error messages for add and edit forms
const alphaErr = "must only contain letters";
const alphaNumErr = "must only contain letters and numbers";
const numErr = "must only contain numbers";
const lengthErr = "must be at least 4 numbers";

// Validation
const validateUser = [
    body("make").trim()
        .isAlpha().withMessage(`Make ${alphaErr}`),
    body("model").trim()
        .isAlphanumeric().withMessage(`Model ${alphaNumErr}`),
    body("year").trim()
        .isNumeric().withMessage(`Year ${numErr}`)
        .isLength({ min: 1 }).withMessage(`Year ${lengthErr}`),
];

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

// Add car - POST method with validation
const postAddCar = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        
        // Fetch all usable values
        const {
            origins, 
            manufacturers, 
            origin_id, 
            manufacturer_id
        } = await returnValues(
            req.body.origins, 
            req.body.manufacturers
        );

        // Handle errors
        if (!errors.isEmpty()) {
            return res.status(400).render("cars/add", {
                title: "Add car",
                origins: origins,
                manufacturers: manufacturers,
                errors: errors.array(),
            });
        }

        // Else insert car 
        await db.insertCar(
            req.body.make,
            req.body.model,
            req.body.year,
            origin_id,
            manufacturer_id
        );
        res.redirect("/");
    }
]

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
    const manufacturer = await db.findManufacturer(id);
    res.render("cars/view", {
        cars: cars,
        manufacturer: manufacturer[0].manufacturer
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

// Edit car - POST method with validation
const postEditCar = [
    validateUser,
    async (req, res) => {
        const { id } = req.params;
        const errors = validationResult(req);

        // Fetch all usable values
        const {
            origins, 
            manufacturers, 
            origin_id, 
            manufacturer_id
        } = await returnValues(
            req.body.origins, 
            req.body.manufacturers
        );

        // Handle errors
        if (!errors.isEmpty()) {
            return res.status(400).render("cars/add", {
                title: "Add car",
                origins: origins,
                manufacturers: manufacturers,
                errors: errors.array(),
            });
        }

        // Else update car details
        await db.updateCarDetails(
            id,
            req.body.make,
            req.body.model,
            req.body.year,
            origin_id,
            manufacturer_id
        )
        res.redirect(`/cars/view/${manufacturer_id}`);
    }
]

module.exports = {
    getAddCar,
    postAddCar,
    getDisplayCar,
    getDisplayCarsByCategory,
    getDisplayCarDetails,
    getEditCar,
    postEditCar
}