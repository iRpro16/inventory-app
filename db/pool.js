const { Pool } = require('pg');
require('dotenv').config();

module.exports = new Pool({
    connectionString: process.env.DB_EXTERNAL_URL,
    ssl: { rejectUnauthorized: false},
});