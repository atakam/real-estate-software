const mysql = require("mysql");

const ndb = () => {
    return mysql.createConnection({
        host: 'us-cdbr-east-03.cleardb.com',
        user: 'bd429b0803fc4b',
        password: '952fa139',
        database: 'heroku_23c8218b3af09e3'
    });
}

module.exports = ndb;