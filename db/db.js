const config = require("./config");
const Pool = require("pg").Pool;

const pool = new Pool({
    user: config.PG_USER,
    password: config.PG_PASSWORD,
    host: config.PG_HOST,
    port: config.PG_PORT,
    database: config.PG_DB_NAME,
});

module.exports = pool;