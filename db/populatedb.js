const { Client } = require("pg");
require('dotenv').config();

const SQL = `
    CREATE TABLE IF NOT EXISTS cars (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        make VARCHAR (255),
        model VARCHAR (255),
        year INT,
        origin_id INT,
        manufacturer_id INT
    );

    CREATE TABLE IF NOT EXISTS origins (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        origin VARCHAR (255)
    );

    CREATE TABLE IF NOT EXISTS manufacturers (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        manufacturer VARCHAR (255)
    );
`

async function main() {
    console.log("seeding...");
    const client = new Client({
        host: "localhost",
        user: "postgres",
        database: "cars_db",
        password: process.env.USER_PASS,
        port: 5432
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();