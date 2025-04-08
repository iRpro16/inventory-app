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
        WHERE cars.manufacturer_id = ${manufacturer_id};
    `
    const { rows } = await pool.query(query);
    return rows;
}

async function getViewCarDetails(car_id) {
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
    WHERE cars.id = ${car_id};
    `

    const { rows } = await pool.query(query);
    return rows;
}


module.exports= {
    getAllOrigins,
    getAllManufacturers,
    insertCar,
    insertManufacturer,
    getAllCarsFromCategory,
    getViewCarDetails
}