const mysql = require("mysql");

//const { promisify }=require ("util");
const { database }=require ("./keys");
const pool = mysql.createPool({
    database:{
        host:"localhost",
        user:"root",
        password:"1417",
        database:"test"
    }
});

pool.getConnection=((err,connection) =>{
    if (err){
        if (err.code === "PROTOCOL_CONNECTION_LOST"){
            console.error("SE HA CERRADO LA CONEXION CON LA BASE DE DATOS");
        }
        if (err.code === "ER_CON_COUNT_ERROR"){
            console.error("DATABASE TIENE MAS CONEXIONES");
        }
        if (err.code === "ECONNREFUSED"){
            console.error("LA CONEXION SE PERDIO");
        }
        if(err){
            console.log(err);
        }
    }
    if (connection) connection.relase()
        console.log("DATABASE CONECTADA");
        return;
});


    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
        // Use the connection
        connection.query(`selec * from asd`, function (error, results, fields) {
          // When done with the connection, release it.
        connection.release();
          // Handle error after the release.
        if (error) throw error;
          // Don't use the connection here, it has been returned to the pool.
        });
    res.send("recibido");
});

pool.query= promisify(pool.query);   //convirtiendo a promesas callbacks

module.exports= pool;

