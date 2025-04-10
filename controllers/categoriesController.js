const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

// Error messages for add and edit forms
const alphaErr = "must only contain letters";

// Validation
const validateUser = [
    body("manufacturer")
        .isAlpha('en-US', {ignore: ' '}).withMessage(`Manufacturer ${alphaErr}`),
];

// Add category - POST method
async function getAddCategory(req, res) {
    res.render("categories/add", {
        title: "Add category"
    })
}

// Add category - POST method
const postAddCategory = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
         // Handle errors
        if (!errors.isEmpty()) {
            return res.status(400).render("categories/add", {
                title: "Add category",
                errors: errors.array(),
            });
        }

        // Insert manufacturer
        await db.insertManufacturer(req.body.manufacturer);
        res.redirect("/");
    }
]

// Get categories - GET method
async function getCategories(req, res) {
    const manufacturers = await db.getAllManufacturers();
    res.render("index", {
        manufacturers: manufacturers
    })
}

// Delete category - GET method
async function getDeleteCategory(req, res) {
    const { id } = req.params;
    await db.deleteCategory(id);
    res.redirect("/");
}

module.exports = {
    getAddCategory,
    postAddCategory,
    getCategories,
    getDeleteCategory
}