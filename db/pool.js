const { Pool } = require('pg');
require('dotenv').config();

module.exports = new Pool({
    host: "localhost",
    user: "postgres",
    database: "cars_db",
    password: process.env.USER_PASS,
    port: 5432
});