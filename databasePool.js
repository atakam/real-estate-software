const mysql = require("mysql");

const ndb = () => {
    return mysql.createConnection({
        host: 'g84t6zfpijzwx08q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'k2ybj23pvp7e10lk',
        password: 'cbwutljq96r2gijk',
        database: 'zp015zxmm7t1dt8f'
    });
}

module.exports = ndb;