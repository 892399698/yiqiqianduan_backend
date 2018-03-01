const mysql = require('mysql');
const conf = require('../config/database');

const sql = {
    connect() {
        var connection = this.connection = mysql.createConnection({
            host: conf.database_host,
            user: conf.database_user,
            database: conf.database_name,
            password: conf.database_password
        });
        connection.connect();
        connection.on('error', function(err) {
		  console.log("[mysql error]",err);
		});

        return connection;
    }
}

// const connection = mysql.createConnection({
//     host: conf.database_host,
//     user: conf.database_user,
//     password: conf.database_password,
//     database: conf.database_name
// });
// connection.connect();


module.exports = sql;