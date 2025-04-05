const pool = require("./pool");

async function getAllCars() {
    let query = `
        SELECT
            cars.make, 
            cars.model, 
            cars.year, 
            origins.origin,
            manufacturers.manufacturer
        FROM cars
        INNER JOIN origins 
            ON cars.origin_id = origins.id
        INNER JOIN manufacturers 
            ON cars.manufacturer_id = manufacturers.id;
    `
    const { rows } = await pool.query(query);
    return rows;
}

async function getAllOrigins() {
    let query = `
        SELECT * FROM origins;
    `
    const { rows } = await pool.query(query);
    return rows;
}

async function getAllManufacturers() {
    let query = `
        SELECT * FROM manufacturers;
    `
    const { rows } = await pool.query(query);
    return rows;
}

async function insertCar(make, model, year, originId, manufacturerId) {
    let query = `
    INSERT INTO cars (make, model, year, origin_id, manufacturer_id)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `
    const values = [make, model, year, originId, manufacturerId];

    await pool.query(query, values);
}


module.exports= {
    getAllCars,
    getAllOrigins,
    getAllManufacturers,
    insertCar
}

/**
 * Have search queries
 * Add, delete, edit queries
 */