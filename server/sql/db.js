const mysql = require('mysql2');
require("dotenv").config();

// Database connection configuration
const db_config = {
    host: 'localhost',
    user: process.env.sqlUser,
    password: process.env.mysqlPass,
    database: process.env.sqlDatabase
};

// Create a connection pool
const connection = mysql.createPool(db_config);

module.exports = connection;