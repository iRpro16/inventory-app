const db = require("../db/queries");

// Add category - POST method
async function getAddCategory(req, res) {
    res.render("categories/add", {
        title: "Add category"
    })
}

// Add category - POST method
async function postAddCategory(req, res) {
    db.insertManufacturer(req.body.manufacturer);
    res.redirect("/");
}

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