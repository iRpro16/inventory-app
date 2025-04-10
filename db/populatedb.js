const { Client } = require("pg");
require('dotenv').config();

const SQL = `
    CREATE TABLE IF NOT EXISTS manufacturers (
        id SERIAL PRIMARY KEY,
        manufacturer VARCHAR (255) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS origins (
        id SERIAL PRIMARY KEY,
        origin VARCHAR (255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        make VARCHAR (255) NOT NULL,
        model VARCHAR (255) NOT NULL,
        year INT NOT NULL,
        origin_id INT NOT NULL,
        manufacturer_id INT NOT NULL,
        FOREIGN KEY(manufacturer_id)
            REFERENCES manufacturers(id)
            ON DELETE CASCADE
    );
`

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DB_EXTERNAL_URL,
        ssl: { rejectUnauthorized: false },
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();