const pool = require("./pool");

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

async function insertManufacturer(manufacturer) {
    let query = `
        INSERT INTO manufacturers (manufacturer)
        VALUES ($1) RETURNING *;
    `

    await pool.query(query, [manufacturer]);
}

async function getAllCarsFromCategory(manufacturer_id) {
    let query = `
        SELECT
            cars.id,
            cars.make, 
            cars.model, 
            cars.year, 
            origins.origin,
            manufacturers.manufacturer
        FROM cars
        INNER JOIN origins 
            ON cars.origin_id = origins.id
        INNER JOIN manufacturers 
            ON cars.manufacturer_id = manufacturers.id
        WHERE cars.manufacturer_id = $1;
    `
    const { rows } = await pool.query(query, [manufacturer_id]);
    return rows;
}

async function viewCarDetails(car_id) {
    let query = `
    SELECT
        cars.id,
        cars.make, 
        cars.model, 
        cars.year, 
        origins.origin,
        manufacturers.manufacturer,
        manufacturers.id AS "manufacturer_id"
    FROM cars
    INNER JOIN origins 
        ON cars.origin_id = origins.id
    INNER JOIN manufacturers 
        ON cars.manufacturer_id = manufacturers.id
    WHERE cars.id = $1;
    `

    const { rows } = await pool.query(query, [car_id]);
    return rows;
}

async function updateCarDetails(car_id, make, model, year, originId, manufacturerId) {
    let query = `
        UPDATE "cars"
        SET make = $1, 
            model = $2,
            year = $3,
            origin_id = $4,
            manufacturer_id = $5
        WHERE cars.id = $6;
    `
    const values = [make, model, year, originId, manufacturerId, car_id];
    await pool.query(query, values);
}

async function deleteCategory(manufacturer_id) {
    let query = `
        DELETE FROM manufacturers
        WHERE id = $1;
    `
    await pool.query(query, [manufacturer_id]);
}

module.exports= {
    getAllOrigins,
    getAllManufacturers,
    insertCar,
    insertManufacturer,
    getAllCarsFromCategory,
    viewCarDetails,
    updateCarDetails,
    deleteCategory
}