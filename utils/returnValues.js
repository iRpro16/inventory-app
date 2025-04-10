const db = require("../db/queries");

async function returnValues(reqBodyOrigin, reqBodyManu) {
    const origins = await db.getAllOrigins();
    const manufacturers = await db.getAllManufacturers();
    const origin_id = origins.find(e => e.origin === reqBodyOrigin).id;
    const manufacturer_id = manufacturers.find(e => e.manufacturer === reqBodyManu).id;

    // return object
    return {
        origins,
        manufacturers,
        origin_id,
        manufacturer_id
    }
}

module.exports = { returnValues };