const mysql = require("mysql");
const {promisify} = require("util");


const pool = mysql.createPool({
        host:"localhost",
        user:"root",
        password:"1417",
        database:"androgallery"
    }
);

pool.query = promisify(pool.query);

module.exports= pool;