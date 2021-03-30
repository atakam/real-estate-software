const mysql = require("mysql");

const ndb = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'real-estate-db'
    });
}

module.exports = ndb;