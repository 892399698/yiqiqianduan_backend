const mysql = require('mysql');
const conf = require('../config/database');



const connection = mysql.createConnection({
    host: conf.database_host,
    user: conf.database_user,
    password: conf.database_password,
    database: conf.database_name
});
connection.connect();


module.exports = connection;